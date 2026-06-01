from __future__ import annotations

import argparse
import sys
from pathlib import Path


DEFAULT_GALLERY_DIR = Path("fe/public/about-gallery")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Remove backgrounds from about gallery photos and save the results "
            "back into the gallery folder."
        )
    )
    parser.add_argument(
        "--dir",
        default=str(DEFAULT_GALLERY_DIR),
        help="Gallery folder to process. Default: fe/public/about-gallery",
    )
    parser.add_argument(
        "--indexes",
        nargs="*",
        type=int,
        help="Photo numbers to process, for example: --indexes 1 3 5. Default: all photo-*.png files.",
    )
    parser.add_argument(
        "--suffix",
        default="-nobg",
        help="Suffix for output files when not replacing originals. Default: -nobg",
    )
    parser.add_argument(
        "--replace",
        action="store_true",
        help="Overwrite the original photo files instead of creating suffixed copies.",
    )
    return parser.parse_args()


def load_rembg_remove():
    try:
        from rembg import remove
    except ImportError:
        print(
            "Missing dependency: rembg\n\n"
            "Install it first:\n"
            "  python -m pip install -r requirements-bg-removal.txt\n\n"
            "Then run this script again.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    return remove


def find_input_files(gallery_dir: Path, indexes: list[int] | None) -> list[Path]:
    if indexes:
        files = [gallery_dir / f"photo-{index}.png" for index in indexes]
        missing = [file for file in files if not file.exists()]
        if missing:
            missing_names = ", ".join(file.name for file in missing)
            raise FileNotFoundError(f"Missing input file(s): {missing_names}")
        return files

    return sorted(
        file
        for file in gallery_dir.glob("photo-*.png")
        if "-nobg" not in file.stem and file.is_file()
    )


def remove_background(input_path: Path, output_path: Path, remove) -> None:
    input_bytes = input_path.read_bytes()
    output_bytes = remove(input_bytes)
    output_path.write_bytes(output_bytes)


def main() -> int:
    args = parse_args()
    gallery_dir = Path(args.dir).resolve()

    if not gallery_dir.exists():
        print(f"Gallery folder not found: {gallery_dir}", file=sys.stderr)
        return 1

    remove = load_rembg_remove()

    try:
        input_files = find_input_files(gallery_dir, args.indexes)
    except FileNotFoundError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    if not input_files:
        print(f"No matching photo-*.png files found in {gallery_dir}")
        return 0

    for input_path in input_files:
        if args.replace:
            output_path = input_path
        else:
            output_path = input_path.with_name(f"{input_path.stem}{args.suffix}.png")

        print(f"Removing background: {input_path.name} -> {output_path.name}")
        remove_background(input_path, output_path, remove)

    print(f"Done. Output folder: {gallery_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
