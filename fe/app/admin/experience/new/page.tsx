import ExperienceForm from "../../../components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">Add New Experience</h1>
        <p className="text-gray-400 font-light text-sm">Add a new chapter to your professional journey.</p>
      </div>
      <ExperienceForm />
    </div>
  );
}
