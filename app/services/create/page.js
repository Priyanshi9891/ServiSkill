"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  FaUser,
  FaBriefcase,
  FaTools,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaSearchLocation,
  FaClock,
  FaMoneyBillWave,
  FaLink,
  FaAward,
  FaCoins,
  FaCheckCircle,
} from "react-icons/fa";
export default function CreateProviderPage() {
  const router = useRouter();
  const { data: session } = useSession();
 const [serviceType, setServiceType] =
  useState("Professional");

const [creditsRequired, setCreditsRequired] =
  useState("");

const [level, setLevel] =
  useState("");

const [duration, setDuration] =
  useState("");

  

  const [formData, setFormData] = useState({
  name: "",
  skill: "",
  experience: "",
  pricing: "",
  location: "",
  portfolio: "",
  latitude: "",
  longitude: "",
});

const [locationResults, setLocationResults] =
  useState([]);

const [selectedLocation, setSelectedLocation] =
  useState(null);

const [loadingLocation, setLoadingLocation] =
  useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const searchLocation = async () => {
  if (!formData.location) {
    alert("Please enter location");
    return;
  }

  try {
    setLoadingLocation(true);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        formData.location
      )}`
    );

    const data = await res.json();

    if (!data.length) {
      alert("Location not found");
      return;
    }

    setLocationResults(data.slice(0, 5));
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingLocation(false);
  }
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!session) {
    alert("Please login first");
    return;
  }

  try {
  
if (!selectedLocation) {
  alert(
    "Please search and confirm location first"
  );
  return;
}

const latitude = Number(
  selectedLocation.lat
);

const longitude = Number(
  selectedLocation.lon
);
    const providerData = {
      ...formData,

      location:
  selectedLocation.display_name,

latitude,
longitude,

geoLocation: {
  type: "Point",
  coordinates: [
    longitude,
    latitude,
  ],
},

      userId: session.user.id,
      email: session.user.email,

      serviceType,

      level:
        serviceType ===
        "Skill Teaching"
          ? level
          : "",

      duration:
        serviceType ===
        "Skill Teaching"
          ? duration
          : "",

      creditsRequired:
        serviceType ===
        "Skill Teaching"
          ? Number(
              creditsRequired
            )
          : 0,
    };

    const res = await fetch(
      "/api/providers",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          providerData
        ),
      }
    );

    const data =
      await res.json();

    if (data.success) {
      alert(
        "service Created Successfully"
      );

      router.push(
        "/dashboard/provider"
      );
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);

    alert(
      "Something went wrong"
    );
  }
};

//   return (
//     <div className="max-w-xl mx-auto p-10">
//       <h1 className="text-3xl font-bold mb-6">
//         Create Provider Profile
//       </h1>

//     <form onSubmit={handleSubmit}>

//   {/* Name */}
//   <input
//     type="text"
//     name="name"
//     placeholder="Your Name"
//     className="w-full border p-2 mb-3 rounded"
//     onChange={handleChange}
//     required
//   />

//   {/* Service Type FIRST */}
//   <div className="mb-4">
//     <label className="font-semibold block mb-2">
//       Service Type
//     </label>

//     <select
//       value={serviceType}
//       onChange={(e) =>
//         setServiceType(e.target.value)
//       }
//       className="w-full border p-2 rounded"
//     >
//       <option value="Professional">
//         Professional Service
//       </option>

//       <option value="Skill Teaching">
//         Skill Teaching
//       </option>
//     </select>
//   </div>

//   {/* Skill Name */}
//   <input
//     type="text"
//     name="skill"
//     placeholder={
//       serviceType === "Skill Teaching"
//         ? "Skill Name (React, Java, Photoshop)"
//         : "Service Name (Electrician, Plumber)"
//     }
//     className="w-full border p-2 mb-3 rounded"
//     onChange={handleChange}
//     required
//   />

//   {/* PROFESSIONAL SERVICE FIELDS */}
//   {serviceType === "Professional" && (
//     <>
//       <input
//         type="number"
//         name="experience"
//         placeholder="Experience (Years)"
//         className="w-full border p-2 mb-3 rounded"
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="number"
//         name="pricing"
//         placeholder="Price ₹"
//         className="w-full border p-2 mb-3 rounded"
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="text"
//         name="location"
//         placeholder="Location"
//         className="w-full border p-2 mb-3 rounded"
//         onChange={handleChange}
//         required
//       />
//       <div className="flex gap-2 mb-3">
//   <button
//     type="button"
//     onClick={searchLocation}
//     className="bg-green-600 text-white px-4 py-2 rounded"
//   >
//     {loadingLocation
//       ? "Searching..."
//       : "Search Location"}
//   </button>
// </div>
// {
//   locationResults.length > 0 && (
//     <div className="border rounded p-3 mb-3">
//       <h3 className="font-semibold mb-2">
//         Select Correct Location
//       </h3>

//       {locationResults.map(
//         (location, index) => (
//           <div
//             key={index}
//             onClick={() =>
//               setSelectedLocation(
//                 location
//               )
//             }
//             className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
//           >
//             {
//               location.display_name
//             }
//           </div>
//         )
//       )}
//     </div>
//   )
// }
// {
//   selectedLocation && (
//     <div className="bg-green-100 p-3 rounded mb-3">
//       <p>
//         <strong>
//           Selected Location:
//         </strong>
//       </p>

//       <p>
//         {
//           selectedLocation.display_name
//         }
//       </p>

//       <p>
//         Latitude:
//         {" "}
//         {selectedLocation.lat}
//       </p>

//       <p>
//         Longitude:
//         {" "}
//         {selectedLocation.lon}
//       </p>
//     </div>
//   )
// }

//       <input
//         type="text"
//         name="portfolio"
//         placeholder="Portfolio Link"
//         className="w-full border p-2 mb-3 rounded"
//         onChange={handleChange}
//       />
//     </>
//   )}

//   {/* SKILL TEACHING FIELDS */}
//   {serviceType === "Skill Teaching" && (
//     <>
//       <input
//         type="text"
//         placeholder="Level (Beginner / Intermediate / Advanced)"
//         value={level}
//         onChange={(e) =>
//           setLevel(e.target.value)
//         }
//         className="w-full border p-2 mb-3 rounded"
//         required
//       />

//       <input
//         type="text"
//         placeholder="Duration (1 Hour)"
//         value={duration}
//         onChange={(e) =>
//           setDuration(e.target.value)
//         }
//         className="w-full border p-2 mb-3 rounded"
//         required
//       />
//        <input
//   type="text"
//   name="location"
//   placeholder="Location"
//   className="w-full border p-2 mb-3 rounded"
//   onChange={handleChange}
// />
//       <input
//         type="number"
//         placeholder="Credits Required"
//         value={creditsRequired}
//         onChange={(e) =>
//           setCreditsRequired(e.target.value)
//         }
//         className="w-full border p-2 mb-3 rounded"
//         required
//       />
//     </>
//   )}

//   <button
//     type="submit"
//     className="bg-blue-600 text-white px-5 py-2 rounded"
//   >
//     Create Service
//   </button>

// </form>
//     </div>
//   );
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-10 px-4">

    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">

        <h1 className="text-4xl font-bold">
          Create your service
        </h1>

        <p className="text-blue-100 mt-2">
          Create your professional service.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6"
      >

        {/* Name */}

        <div>

          <label className="font-semibold text-gray-800 mb-2 block">
            <FaUser className="inline mr-2 text-blue-600" />
            Your Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 outline-none text-gray-500"
            onChange={handleChange}
            required
          />

        </div>

        {/* Service Type */}

        <div>

          <label className="font-semibold text-gray-800 mb-2 block">
            <FaBriefcase className="inline mr-2 text-blue-600" />
            Service Type
          </label>

          <select
            value={serviceType}
            onChange={(e) =>
              setServiceType(e.target.value)
            }
            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 outline-none text-gray-500"
          >
            <option value="Professional">
              Professional Service
            </option>

            <option value="Skill Teaching">
              Skill Teaching
            </option>

          </select>

        </div>

        {/* Skill */}

        <div>

          <label className="font-semibold text-gray-800 mb-2 block">
            <FaTools className="inline mr-2 text-orange-500" />
            {serviceType === "Skill Teaching"
              ? "Skill Name"
              : "Service Name"}
          </label>

          <input
            type="text"
            name="skill"
            placeholder={
              serviceType === "Skill Teaching"
                ? "React, Java, Photoshop..."
                : "Electrician, Plumber..."
            }
            className="w-full border-2 text-gray-500 border-gray-200 rounded-xl p-3 focus:border-blue-500 outline-none"
            onChange={handleChange}
            required
          />

        </div>

        {/* PROFESSIONAL */}

        {serviceType === "Professional" && (

          <>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold text-gray-800 mb-2 block">
                  <FaAward className="inline mr-2 text-yellow-500" />
                  Experience
                </label>

                <input
                  type="number"
                  name="experience"
                  placeholder="Years"
                  className="w-full border-2 text-gray-500 border-gray-200 rounded-xl p-3"
                  onChange={handleChange}
                  required
                />

              </div>

              <div>

                <label className="font-semibold text-gray-800 mb-2 block">
                  <FaMoneyBillWave className="inline mr-2 text-green-600" />
                  Pricing
                </label>

                <input
                  type="number"
                  name="pricing"
                  placeholder="₹ Price"
                  className="w-full border-2 text-gray-500 border-gray-200 rounded-xl p-3"
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div>

              <label className="font-semibold text-gray-800 mb-2 block">
                <FaMapMarkerAlt className="inline mr-2 text-red-500" />
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Enter location"
                className="w-full border-2 text-gray-500 border-gray-200 rounded-xl p-3"
                onChange={handleChange}
                required
              />

            </div>

            <button
              type="button"
              onClick={searchLocation}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              <FaSearchLocation className="inline mr-2" />

              {loadingLocation
                ? "Searching..."
                : "Search Location"}

            </button>

            {locationResults.length > 0 && (

              <div className="bg-gray-50 border rounded-2xl p-5">

                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Select Correct Location
                </h3>

                {locationResults.map(
                  (location, index) => (

                    <div
                      key={index}
                      onClick={() =>
                        setSelectedLocation(
                          location
                        )
                      }
                      className="border rounded-xl p-3 mb-3 text-gray-500  cursor-pointer hover:bg-blue-50 transition"
                    >
                      <FaMapMarkerAlt className="inline mr-2 text-red-500" />

                      {location.display_name}

                    </div>

                  )
                )}

              </div>

            )}

            {selectedLocation && (

              <div className="bg-green-50 border border-green-300 rounded-2xl p-5">

                <h3 className="font-bold text-green-700 mb-3">
                  <FaCheckCircle className="inline mr-2" />
                  Selected Location
                </h3>

                <p className="text-gray-800">
                  {selectedLocation.display_name}
                </p>

                <p className="mt-2 text-gray-500">
                  <strong>Latitude:</strong>{" "}
                  {selectedLocation.lat}
                </p>

                <p  className="mt-2 text-gray-500">
                  <strong>Longitude:</strong>{" "}
                  {selectedLocation.lon}
                </p>

              </div>

            )}

            <div>

              <label className="font-semibold text-gray-800 mb-2 block">
                <FaLink className="inline mr-2 text-purple-600" />
                Portfolio
              </label>

              <input
                type="text"
                name="portfolio"
                placeholder="Portfolio URL"
                className="w-full border-2 text-gray-500 border-gray-200 rounded-xl p-3"
                onChange={handleChange}
              />

            </div>

          </>

        )}

        {/* SKILL TEACHING */}

        {serviceType === "Skill Teaching" && (

          <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-6 space-y-5">

            <h3 className="text-xl font-bold text-yellow-700 flex items-center gap-2">
              <FaGraduationCap />
              Skill Teaching Details
            </h3>

            <input
              type="text"
              placeholder="Level (Beginner / Intermediate / Advanced)"
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
              className="w-full border text-gray-500 rounded-xl p-3"
              required
            />

            <input
              type="text"
              placeholder="Duration (1 Hour)"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              className="w-full text-gray-500 border rounded-xl p-3"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full border text-gray-500 rounded-xl p-3"
              onChange={handleChange}
            />

            <input
              type="number"
              placeholder="Credits Required"
              value={creditsRequired}
              onChange={(e) =>
                setCreditsRequired(
                  e.target.value
                )
              }
              className="w-full border text-gray-500 rounded-xl p-3"
              required
            />

          </div>

        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition hover:scale-[1.02]"
        >
          🚀 Create Service
        </button>

      </form>

    </div>

  </div>
);
}
