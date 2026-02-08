import EducationForm from "../../components/EducationForm";
import Link from "next/link";

export default function NewEducationPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Add New Education
        </h1>
        <p className="text-gray-400 font-light text-sm">
          Add a new chapter to your academic journey.
        </p>
      </div>
      <EducationForm />
    </div>
  );
}
