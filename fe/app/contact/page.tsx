import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="text-gray-600">
        Feel free to reach out using the form below.
      </p>

      <ContactForm />
    </section>
  );
}
