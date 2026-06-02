import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Faaid Sakhaa | Portfolio",
  description:
    "Portfolio of Faaid Sakhaa, a software engineer focused on performant, thoughtfully crafted web experiences.",
};

export default function Page() {
  return <HomeClient />;
}
