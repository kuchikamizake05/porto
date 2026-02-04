import ProjectForm from "../../../components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">Add New Project</h1>
        <p className="text-gray-400 font-light text-sm">Fill in the details below to showcase a new piece of work.</p>
      </div>
      <ProjectForm />
    </div>
  );
}
