import EducationForm from "../../../components/EducationForm";
import Link from "next/link";

export default function EditEducationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Edit Education
        </h1>
        <p className="text-gray-400 font-light text-sm">
          Update your academic milestone details.
        </p>
      </div>
      <EducationForm id={params.id} />
    </div>
  );
}
