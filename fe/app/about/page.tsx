import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Faaid Sakhaa",
  description:
    "Learn more about Faaid Sakhaa, education, experience, and the craft behind the portfolio.",
};

export default function AboutPage() {
  return <AboutClient />;
}
