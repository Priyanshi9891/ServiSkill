"use client";

export default function ServicesPage() {
  const services = [
    "Web Development",
    "Graphic Design",
    "Mathematics Tutor",
    "Electrician",
    "Plumber",
    "Digital Marketing",
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Services
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow"
          >
            {service}
          </div>
        ))}
      </div>
    </div>
  );
}