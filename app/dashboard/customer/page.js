
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import useLocation from "@/hooks/useLocation";
import calculateDistance from "@/utils/calculateDistance";
import NotificationBell from "@/components/common/NotificationBell";
import recommendProviders from "@/utils/recommendProviders";
import ProviderMapModal
from "@/components/map/ProviderMapModal";
import dynamic from "next/dynamic";

const NearbyProvidersMap = dynamic(
  () =>
    import(
      "@/components/map/NearbyProvidersMap"
    ),
  {
    ssr: false,
  }
);

export default function CustomerDashboard() {
  const { data: session, status } = useSession();
const [selectedProvider, setSelectedProvider] =
  useState(null);
 
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
const [showMap, setShowMap] =
  useState(false);
 

const [showCustomerCard,
setShowCustomerCard] =
useState(true);

const [showDestinationCard,
setShowDestinationCard] =
useState(true);


const [destination, setDestination] =
  useState("");

const [destinationLocation,
setDestinationLocation] =
  useState(null);

const [filteredProviders,
setFilteredProviders] =
  useState([]);

const {
  location: customerLocation,
  address,
} = useLocation();

const [aiQuery, setAiQuery] =
  useState("");

const [
  recommendedProviders,
  setRecommendedProviders
] = useState([]);

const [aiSearchPerformed, setAiSearchPerformed] =
  useState(false);
const searchLocation =
async () => {

  if (!destination) return;

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
  );

  const data =
    await res.json();

  if (!data.length) {
    alert("Location not found");
    return;
  }

  const location = {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
    address:
      data[0].display_name,
  };

  setDestinationLocation(
    location
  );

  const nearby =
    providers.filter(
      (provider) => {

        const distance =
          calculateDistance(
            location.lat,
            location.lng,
            provider.latitude,
            provider.longitude
          );

        return distance <= 5;
      }
    );

  setFilteredProviders(
    nearby
  );
};
  useEffect(() => {
    if (session?.user?.email) {
      fetchProviders();
    }
  }, [session]);
useEffect(() => {
  if (aiQuery.trim() === "") {
    setFilteredProviders([]);
    setRecommendedProviders([]);
    setAiSearchPerformed(false);
  }
}, [aiQuery]);

  async function fetchProviders() {
    try {
      const res = await fetch(
        `/api/providers?search=${encodeURIComponent(search)}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setProviders(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAISearch =
  async () => {

    if (!aiQuery) return;

    try {

      const res =
        await fetch(
          "/api/ai/recommend",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              query: aiQuery,
            }),
          }
        );

      const data =
        await res.json();

      if (!data.success) {
        alert("AI Error");
        return;
      }

      const category =
        data.category.toLowerCase();

      const results =
        providers.filter(
          (provider) =>
            provider.skill
              .toLowerCase()
              .includes(category)
        );
        const rankedProviders =
  recommendProviders(
    results,
    customerLocation
  );

setRecommendedProviders(
  rankedProviders
);


      setFilteredProviders(
        // results
         rankedProviders
      );
setAiSearchPerformed(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
     

    <Navbar />
      {/* HERO SECTION */}
 <section className="py-16 px-6">

  <div className="max-w-5xl mx-auto text-center">

    <h1 className="text-5xl font-bold text-black mb-4">
      Find Trusted Local Services
    </h1>

    <p className="text-black text-lg mb-10">
      Plumbers, Electricians, Tutors, Mechanics and more
    </p>

    {/* MAIN SEARCH */}
    <div className="flex justify-center items-center gap-3 flex-wrap">

      <div className="flex w-full max-w-3xl bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">

        <input
          type="text"
          placeholder="Search by skill, provider name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            px-6
            py-4
            outline-none
            text-lg
            text-black
            placeholder:text-gray-500
          "
        />

        <button
          onClick={fetchProviders}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            transition
          "
        >
          Search
        </button>

      </div>

      {/* MAP BUTTON */}
      <button
        onClick={() => setShowMap(true)}
        className="
          bg-green-600
          hover:bg-green-700
          text-white
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          text-xl
          shadow-lg
          transition
        "
      >
        🗺
      </button>

      {/* EMERGENCY BUTTON */}
      <Link
        href="/emergency"
        className="
          fixed
          bottom-6
          right-6
          bg-red-600
          text-white
          w-16
          h-16
          rounded-full
          flex
          items-center
          justify-center
          text-2xl
          shadow-lg
          z-50
        "
      >
        🚨
      </Link>

    </div>

    
    {/* AI SEARCH BAR */}
<div className="mt-6 flex justify-center items-center w-full">

  <div
    className="
      relative
      w-full
      max-w-xl
      rounded-full
      p-[2px]
      bg-gradient-to-r
      from-cyan-400
      via-blue-500
      via-purple-500
      to-pink-500
      shadow-[0_0_20px_rgba(59,130,246,0.35),0_0_40px_rgba(168,85,247,0.25),0_0_60px_rgba(236,72,153,0.15)]
    "
  >

    <div className="flex items-center bg-white rounded-full overflow-hidden">

     <div className="flex items-center px-5 text-cyan-600">
          <FaRobot size={20} />
        </div>

      <input
        type="text"
        value={aiQuery}
        onChange={(e) => setAiQuery(e.target.value)}
        placeholder="Ask AI to find the perfect service..."
        className="
          flex-1
          py-3
          pr-3
          outline-none
          text-black
          placeholder:text-gray-500
          bg-transparent
        "
      />

      <button
        onClick={handleAISearch}
        className="
          px-6
          py-3
          bg-gradient-to-r
          from-cyan-500
          via-blue-500
          to-purple-500
          text-white
          font-medium
          hover:opacity-90
          transition
        "
      >
        AI Search
      </button>

    </div>

  </div>

</div>

  </div>

</section>

      {/* SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
{recommendedProviders.length > 0 && (

  <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mb-6">

    <h2 className="text-2xl font-semibold text-black mb-2">
      🤖 AI Recommendation
    </h2>

    <p className="text-black">
      Best Match:
      <strong className="text-black">
        {" "}
        {recommendedProviders[0].name}
      </strong>
    </p>

    <p className="text-black">
      Skill:
      {" "}
      {recommendedProviders[0].skill}
    </p>

    <p className="text-black">
      Rating:
      {" "}
      ⭐
      {recommendedProviders[0].rating}
    </p>

    <p className="text-black">
      Experience:
      {" "}
      {recommendedProviders[0].experience}
      {" "}
      Years
    </p>

  </div>

)}
        <h2 className="text-3xl font-semibold text-black mb-8">
  Available Service Providers
</h2>

        {providers.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center shadow">
            No Providers Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
{/* ai hear */}
              {(filteredProviders.length > 0
    ? filteredProviders
    : providers
  ).map((provider) => {

              const distance =
  customerLocation?.lat != null &&
  customerLocation?.lng != null &&
  provider?.latitude != null &&
  provider?.longitude != null
    ? calculateDistance(
        customerLocation.lat,
        customerLocation.lng,
        provider.latitude,
        provider.longitude
      )
    : null;

              return (
              <div
  key={provider._id}
  className="bg-white text-black rounded-2xl shadow-lg hover:shadow-xl transition p-6"
>

                  {/* Provider Name */}
                  <div className="flex justify-between items-center mb-3">

                 <h3 className="text-2xl font-semibold text-black">
  {provider.name}
</h3>
 {recommendedProviders.length > 0 &&

   recommendedProviders.findIndex(
     (p) =>
       p._id === provider._id
   ) !== -1 && (

    <span className="bg-yellow-200 px-2 rounded">

      #
      {
        recommendedProviders.findIndex(
          (p) =>
            p._id === provider._id
        ) + 1
      }

    </span>

  )}
                    {provider.isVerified && (
                      <span className="text-green-600 font-semibold">
                        ✔
                      </span>
                    )}
                  </div>

                  {/* Skill */}
                  <p className="text-blue-600 font-semibold mb-2">
                    {provider.skill}
                  </p>

<div className="space-y-2 text-gray-700">

  {provider.serviceType === "Skill Teaching" ? (

    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mt-3">

      <p className="font-bold text-yellow-700">
        📚 Skill Teaching
      </p>

      <p>
        Level: {provider.level}
      </p>

      <p>
        Duration: {provider.duration}
      </p>

      <p>
        Credits Required: {provider.creditsRequired}
      </p>
      

    </div>

  ) : (

    <div className="bg-green-50 border border-green-300 rounded-lg p-3 mt-3">

      <p className="font-bold text-green-700">
        💼 Professional Service
      </p>

      <p>
        Experience: {provider.experience} Years
      </p>

      <p>
        Price: ₹{provider.pricing}
      </p>

      <p>
        Location: {provider.location}
      </p>

    </div>

  )}

  {provider.serviceType === "Professional" &&
    distance && (
      <p>
        📍 Distance: {distance} 
      </p>
    )}
    {provider.score && (
  <p className="text-green-600 font-semibold">
    🤖 AI Score:
    {" "}
    {provider.score.toFixed(0)}
  </p>
)}

</div>
                  {/* Rating */}
                  <div className="mt-5 text-center">

                    <div className="text-2xl font-bold text-yellow-500">
                      ⭐ {provider.rating || 0}
                    </div>

                    <Link
                      href={`/providers/${provider._id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Reviews
                    </Link>

                  </div>

                  {/* Book Button */}
                 
<div className="mt-6 flex justify-center">

 
  <Link
  href={`/bookings/create?providerId=${provider._id}&providerName=${provider.name}&providerEmail=${provider.email}&serviceType=${provider.serviceType}&pricing=${provider.pricing || 0}&creditsRequired=${provider.creditsRequired || 0}&skill=${encodeURIComponent(provider.skill || "")}&duration=${encodeURIComponent(provider.duration || "")}&level=${encodeURIComponent(provider.level || "")}`}
  className={`text-white px-6 py-3 rounded-full font-semibold ${
    provider.serviceType === "Skill Teaching"
      ? "bg-yellow-500 hover:bg-yellow-600"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {provider.serviceType === "Skill Teaching"
    ? "📚 Learn Skill"
    : "🔧 Book Service"}
</Link>

</div>
                  {/* Map Icon */}
                 {provider.serviceType === "Professional" && (
  <div className="flex justify-center mt-4">

    <button
  onClick={() =>
    setSelectedProvider(provider)
  }
  className="text-2xl hover:scale-110 transition"
>
  🗺️
</button>

  </div>

)}

                </div>
              );
            })}
            {selectedProvider && (
  <ProviderMapModal
    provider={selectedProvider}
    userLocation={customerLocation}
    customerAddress={address}
    onClose={() =>
      setSelectedProvider(null)
    }
  />
)}
          </div>
        )}

      </section>


{showMap && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

    <div className="bg-white w-[95%] max-w-7xl h-[90vh] rounded-xl p-4 relative flex flex-col">

      {/* Close Button */}
      <button
        onClick={() => setShowMap(false)}
        className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
      >
        ✖
      </button>

      <h2 className="text-2xl text-gray-700 font-bold mb-4">
        Nearby Providers Map
      </h2>

      {/* Search Bar */}
      <div className="flex gap-2 text-gray-500 mb-4">

        <input
          type="text"
          value={destination}
          onChange={(e) =>
            setDestination(
              e.target.value
            )
          }
          placeholder="Search destination..."
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={searchLocation}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>

      </div>

      {/* Main Layout */}
      <div className="flex flex-1 gap-4 overflow-hidden">

        {/* Left Information Panel */}
        <div className="w-[320px] overflow-y-auto space-y-4">

          {showCustomerCard && (
            <div className="bg-white border rounded-xl p-4 shadow">

              <div className="flex justify-between items-center">

                <h3 className="font-bold text-gray-500 text-lg">
                  📍 Your Location
                </h3>

                <button
                  onClick={() =>
                    setShowCustomerCard(false)
                  }
                  className="text-red-500"
                >
                  ✖
                </button>

              </div>

              <p className="mt-3 text-sm text-gray-500">
                {address || "Loading address..."}
              </p>

            </div>
          )}

          {destinationLocation &&
            showDestinationCard && (
              <div className="bg-white border rounded-xl p-4 shadow">

                <div className="flex justify-between text-gray-500 items-center">

                  <h3 className="font-bold text-lg text-gray-500 text-purple-700">
                    🚩 Destination
                  </h3>

                  <button
                    onClick={() =>
                      setShowDestinationCard(false)
                    }
                    className="text-red-500"
                  >
                    ✖
                  </button>

                </div>

                <p className="mt-3 text-gray-500 text-sm">
                  {
                    destinationLocation.address
                  }
                </p>

              </div>
            )}

          {/* Nearby Providers List */}
        {destinationLocation && (

<div>

  <h3 className="font-bold text-gray-700 text-lg mb-3">
    Nearby Providers
  </h3>

  {filteredProviders.length === 0 ? (

    <p>
      No providers found nearby
    </p>

  ) : (

    filteredProviders.map(
      (provider) => (

      <div
        key={provider._id}
        className="
          border
          rounded-lg
          p-3
          mb-2
          shadow
        "
      >

        <h4 className="font-bold text-gray-500">
          {provider.name}
        </h4>

        <p>
          {provider.skill}
        </p>

        <p>
          {provider.location}
        </p>

        <p>
          ₹{provider.pricing}
        </p>

      </div>

      )
    )

  )}

</div>

)}

        </div>

        {/* Map */}
        <div className="flex-1 rounded-xl overflow-hidden border text-gray-500">

          {customerLocation && (
            <NearbyProvidersMap
              customerLocation={
                customerLocation
              }
              customerAddress={
                address
              }
              providers={
                destinationLocation
                  ? filteredProviders
                  : providers
              }
              destinationLocation={
                destinationLocation
              }
            />
          )}

        </div>

      </div>

    </div>

  </div>
)}

    </div>
  );
}