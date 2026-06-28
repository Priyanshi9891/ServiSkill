

"use client";

import { useEffect, useState } from "react";

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  async function fetchProviders() {
    const res = await fetch("/api/providers");

    const data = await res.json();

    setProviders(data);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Service Providers
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <div
            key={provider._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-xl font-bold">
              {provider.name}
            </h2>

            <p>
              Skill: {provider.skill}
            </p>

            <p>
              Experience: {provider.experience} Years
            </p>

            <p>
              ₹ {provider.pricing}
            </p>

            <p>
              {provider.location}
            </p>

            {provider.portfolio && (
              <a
                href={provider.portfolio}
                target="_blank"
                className="text-blue-600"
              >
                Portfolio
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}