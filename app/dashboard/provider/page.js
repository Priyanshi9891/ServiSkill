
"use client";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

import CreditHistory from "@/components/credits/CreditHistory";
import {
  FaTachometerAlt,FaUser,
  FaEnvelope,
  FaPlusCircle, FaGraduationCap, FaUserTie,
  FaTools,
  FaCheckCircle,
  FaCalendarCheck,FaMapMarkerAlt,FaRupeeSign,
  FaBriefcase,
  FaStar,
 FaClipboardList,
  FaBookOpen,  FaComments,
  FaExclamationTriangle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
export default function ProviderDashboard() {
  const { data: session } = useSession();
const [providerProfile, setProviderProfile] =
  useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
 const [credits, setCredits] =
  useState(0);
  const [transactions, setTransactions] =
  useState([]);
  const [availableSkills, setAvailableSkills] =
  useState([]);
  const [myLearnings, setMyLearnings] =
  useState([]);
  const [unreadCount, setUnreadCount] =
  useState(0);
  const [emergencies,
setEmergencies] = useState([]);
const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    if (session?.user?.email) {
      loadServices();
      loadBookings();
       loadAvailableSkills();
        loadMyLearnings();
    }
  }, [session]);
  
  
  useEffect(() => {
  if (session?.user?.id) {
    loadCredits();
     loadTransactions();
  }
}, [session]);
useEffect(() => {
  if (session?.user?.id) {
    loadCount();

    const interval =
      setInterval(loadCount, 5000);

    return () =>
      clearInterval(interval);
  }
}, [session]);
useEffect(() => {
  if (session?.user?.email) {
    fetchProviderProfile();
  }
}, [session]);
useEffect(() => {
  if (session?.user?.email) {
    fetchEmergencies();
  }
}, [session]);

const fetchProviderProfile =
async () => {
  try {
    const res =
      await fetch(
        `/api/providers?email=${session.user.email}`
      );

    const data =
      await res.json();

    if (data.length > 0) {
      setProviderProfile(data[0]);
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchEmergencies =
async () => {

  if (!session?.user?.email) return;

  const res =
    await fetch(
      `/api/emergency/provider?email=${session.user.email}`
    );

  const data =
    await res.json();

  setEmergencies(data);
};

  async function loadServices() {
    try {
      const res = await fetch(
        `/api/providers?email=${session?.user?.email}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setServices(data);

        if (data.length > 0) {
          const reviewRes = await fetch(
            `/api/reviews?providerId=${data[0]._id}`
          );

          const reviewData = await reviewRes.json();

          setReviews(reviewData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
 async function loadCredits() {
  try {
    const res = await fetch(
      `/api/users/${session.user.id}`
    );

    const data = await res.json();

    if (data.success) {
      setCredits(
        data.user.credits || 0
      );
    }
   
  } catch (error) {
    console.log(error);
  }
}
 async function loadTransactions() {
  try {
    const res = await fetch(
      `/api/credits/history?userId=${session.user.id}`
    );

    const data = await res.json();

    setTransactions(data);
  } catch (error) {
    console.log(error);
  }
}
const loadCount = async () => {
  const res = await fetch(
    `/api/notifications/unread?userId=${session.user.id}`
  );

  const data = await res.json();

  setUnreadCount(data.count);
};
async function loadAvailableSkills() {
  try {
    const res = await fetch(
      "/api/providers"
    );

    const data = await res.json();

    const skillsOnly =
      data.filter(
        (item) =>
          item.serviceType ===
            "Skill Teaching" &&
          item.email !==
            session.user.email
      );

    setAvailableSkills(skillsOnly);
  } catch (error) {
    console.log(error);
  }
}
async function loadMyLearnings() {
  try {
    const res = await fetch(
      `/api/bookings?customerEmail=${session.user.email}`
    );

    const data = await res.json();

    setMyLearnings(data);
  } catch (error) {
    console.log(error);
  }
}

  async function loadBookings() {
    try {
      const res = await fetch(
        `/api/bookings?providerEmail=${session?.user?.email}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadReviews() {
    try {
      const res = await fetch(
        `/api/reviews?providerId=${services[0]?._id}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStatus(id, status) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Status Updated");

        loadBookings();
        loadReviews();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
 const acceptEmergency =
async (id) => {

  if (!providerProfile) {
    alert(
      "Provider profile not loaded"
    );
    return;
  }

  const res =
  await fetch(
    `/api/emergency/${id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        providerId:
          providerProfile._id,
      }),
    }
  );

  const data =
    await res.json();

  alert(
    data.message ||
    "Emergency accepted"
  );
 

  fetchEmergencies();
};
return (
  <div className="min-h-screen bg-gray-100">

    {/* NAVBAR */}
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50 flex justify-between items-center px-8">

      <h1 className="text-2xl font-bold text-blue-600">
        ServiSkill
      </h1>
  

      <div className="flex items-center gap-5">
        <Link
              href="/credits"
              className="bg-yellow-500 text-white px-4 py-2 rounded-full"
            >
              Wallet
            </Link>
  
        <div className="bg-yellow-100 px-4 py-2 rounded-full font-semibold text-gray-400">
  🪙 {credits} Credits
</div>
 
      <Link
  href="/notifications"
  className="relative"
>
  🔔

  {unreadCount > 0 && (
    <span
      className="
      absolute
      -top-2
      -right-2
      bg-red-500
      text-white
      text-xs
      rounded-full
      px-2
    "
    >
      {unreadCount}
    </span>
  )}
</Link>

        <div className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name}`}
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />

          <span className="font-semibold text-gray-700">
            {session?.user?.name}
          </span>
        </div>

      </div>

    </nav>

    <div className="flex pt-16">
<div
  className={`fixed top-20 z-50 transition-all duration-300 ${
    sidebarOpen ? "left-60" : "left-3"
  }`}
>
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="bg-white border border-gray-200 shadow-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
  >
    {sidebarOpen ? (
      <FaChevronLeft className="text-lg" />
    ) : (
      <FaChevronRight className="text-lg" />
    )}
  </button>
</div>
      {/* SIDEBAR */}
  <aside
  className={`bg-white shadow-lg h-[calc(100vh-64px)] sticky top-16 transition-all duration-300 overflow-hidden ${
    sidebarOpen ? "w-64 p-6" : "w-0 p-0"
  }`}
>

  {sidebarOpen && (

    <div className="space-y-3">

      <a
        href="#dashboard"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
      >
        <FaTachometerAlt className="text-blue-600 text-lg" />
        Dashboard
      </a>

      <Link
        href="/services/create"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200"
      >
        <FaPlusCircle className="text-green-600 text-lg" />
        Create Service
      </Link>

      <a
        href="#services"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-orange-100 hover:text-orange-700 transition-all duration-200"
      >
        <FaTools className="text-orange-600 text-lg" />
        My Services
      </a>

      <a
        href="#bookings"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200"
      >
        <FaCalendarCheck className="text-indigo-600 text-lg" />
        Booking Requests
      </a>

      <a
        href="#reviews"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-200"
      >
        <FaStar className="text-yellow-500 text-lg" />
        Reviews
      </a>

      <a
        href="#learnSkill"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-purple-100 hover:text-purple-700 transition-all duration-200"
      >
        <FaGraduationCap className="text-purple-600 text-lg" />
        Learn Skill
      </a>

      <a
        href="#mylearning"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-cyan-100 hover:text-cyan-700 transition-all duration-200"
      >
        <FaBookOpen className="text-cyan-600 text-lg" />
        My Learning
      </a>

      <a
        href="#emergency"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-red-100 hover:text-red-700 transition-all duration-200"
      >
        <FaExclamationTriangle className="text-red-600 text-lg" />
        Emergency Requests
      </a>

      <Link
        href="/profile"
        className="flex items-center gap-3 p-3 rounded-xl text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
      >
        <FaUserCircle className="text-blue-600 text-lg" />
        Profile
      </Link>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
        className="w-full flex items-center gap-3 text-left p-3 rounded-xl text-red-600 font-medium hover:bg-red-100 transition-all duration-200"
      >
        <FaSignOutAlt className="text-lg" />
        Logout
      </button>

    </div>

  )}
  

</aside>
      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">

        {/* DASHBOARD HEADER */}
        <section id="dashboard">


          <h1 className="text-4xl font-bold text-black">
            Provider Dashboard
          </h1>

          <p className="text-gray-500 mb-8">
            Manage services, bookings and reviews
          </p>

        </section>

        {/* RATING CARD */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-8 shadow-lg mb-8">

          <h2 className="text-2xl font-bold">
            Overall Rating
          </h2>

          <div className="flex items-center gap-4 mt-3">

            <span className="text-6xl">
              ⭐
            </span>

            <div>

              <p className="text-5xl font-bold">
                {services[0]?.rating || 0}
              </p>

              <p>
                Based on customer reviews
              </p>

            </div>

          </div>

        </div>

        {/* STATS */}
      {/* Dashboard Stats */}

<div className="grid md:grid-cols-4 gap-6 mb-10">

  {/* Services */}

  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white hover:scale-105 transition-all duration-300">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-blue-100 font-medium">
          Services
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {services.length}
        </h2>

      </div>

      <FaTools className="text-5xl opacity-80" />

    </div>

  </div>

  {/* Bookings */}

  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white hover:scale-105 transition-all duration-300">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-green-100 font-medium">
          Bookings
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {bookings.length}
        </h2>

      </div>

      <FaCalendarCheck className="text-5xl opacity-80" />

    </div>

  </div>

  {/* Reviews */}

  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white hover:scale-105 transition-all duration-300">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-yellow-100 font-medium">
          Reviews
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {reviews.length}
        </h2>

      </div>

      <FaStar className="text-5xl opacity-80" />

    </div>

  </div>

  {/* Accepted */}

  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white hover:scale-105 transition-all duration-300">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-indigo-100 font-medium">
          Accepted
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {
            bookings.filter(
              (b) => b.status === "Accepted"
            ).length
          }
        </h2>

      </div>

      <FaCheckCircle className="text-5xl opacity-80" />

    </div>

  </div>

</div>

{/* MY SERVICES */}

<section
  id="services"
  className="mb-12"
>

  <div className="flex items-center gap-3 mb-6">

    <FaTools className="text-3xl text-blue-600" />

    <h2 className="text-3xl font-bold text-gray-900">
      My Services
    </h2>

  </div>

  <div className="grid md:grid-cols-2 gap-6">

    {services.map((service) => (

      <div
        key={service._id}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300"
      >

        {/* Service Header */}

        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl">

            <FaTools />

          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-900">
              {service.skill}
            </h3>

            <p className="text-gray-500">
              Professional Service
            </p>

          </div>

        </div>

        <div className="space-y-4">

          <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">

            <FaBriefcase className="text-blue-600 text-lg" />

            <div>

              <p className="text-sm text-gray-500">
                Experience
              </p>

              <p className="font-semibold text-gray-900">
                {service.experience} Years
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">

            <FaRupeeSign className="text-green-600 text-lg" />

            <div>

              <p className="text-sm text-gray-500">
                Price
              </p>

              <p className="font-semibold text-gray-900">
                ₹{service.pricing}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-3">

            <FaMapMarkerAlt className="text-orange-600 text-lg" />

            <div>

              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="font-semibold text-gray-900">
                {service.location}
              </p>

            </div>

          </div>

        </div>

      </div>

    ))}

  </div>

</section>

       
       {/* BOOKING REQUESTS */}

<section
  id="bookings"
  className="mb-12"
>

  <div className="flex items-center gap-3 mb-6">

    <FaCalendarCheck className="text-3xl text-blue-600" />

    <h2 className="text-3xl font-bold text-gray-900">
      Booking Requests
    </h2>

  </div>

  <div className="space-y-6">

    {bookings.map((booking) => (

      <div
        key={booking._id}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6"
      >

        {/* Header */}

        <div className="flex justify-between items-start flex-wrap gap-4 mb-6">

          <div>

            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              {booking.customerName}
            </h3>

            <p className="text-gray-700 mt-2 flex items-center gap-2">
              <FaEnvelope className="text-green-600" />
              {booking.customerEmail}
            </p>

          </div>

          <span
            className={`px-5 py-2 rounded-full font-bold text-white ${
              booking.status === "Completed"
                ? "bg-green-600"
                : booking.status === "Accepted"
                ? "bg-blue-600"
                : "bg-yellow-500"
            }`}
          >
            {booking.status}
          </span>

        </div>

        {/* Booking Details */}

        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">

            <FaTools className="text-blue-600 text-xl" />

            <div>

              <p className="text-sm text-gray-500">
                Service
              </p>

              <p className="font-semibold text-gray-900">
                {booking.service}
              </p>

            </div>

          </div>

          <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">

            <FaCalendarCheck className="text-green-600 text-xl" />

            <div>

              <p className="text-sm text-gray-500">
                Booking Date
              </p>

              <p className="font-semibold text-gray-900">
                {booking.bookingDate}
              </p>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex gap-3 flex-wrap">

          <button
            onClick={() =>
              updateStatus(
                booking._id,
                "Accepted"
              )
            }
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition"
          >
            ✅ Accept
          </button>

          <button
            onClick={() =>
              updateStatus(
                booking._id,
                "Completed"
              )
            }
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition"
          >
            ✔ Complete
          </button>

          <Link
            href={`/messages/${booking._id}`}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md flex items-center gap-2 transition"
          >
            <FaComments />
            Chat Customer
          </Link>

        </div>

      </div>

    ))}

  </div>

</section>

{/* REVIEWS */}


       <section id="learnSkill">

  <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-5 flex items-center gap-2">
    📚 Available Skills To Learn
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {availableSkills.map((skill) => (

      <div
        key={skill._id}
        className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 shadow-sm"
      >

        <p className="font-bold text-yellow-700 text-lg mb-3">
          📚 Skill Teaching
        </p>

        <div className="space-y-2 text-gray-800">

          <p>
            <span className="font-semibold text-gray-900">
              Skill:
            </span>{" "}
            {skill.skill}
          </p>

          <p>
            <span className="font-semibold text-gray-900">
              Teacher:
            </span>{" "}
            {skill.name}
          </p>

          <p>
            <span className="font-semibold text-gray-900">
              Level:
            </span>{" "}
            {skill.level}
          </p>

          <p>
            <span className="font-semibold text-gray-900">
              Duration:
            </span>{" "}
            {skill.duration}
          </p>

          <p className="font-semibold text-yellow-700">
            🪙 Credits Required: {skill.creditsRequired}
          </p>

        </div>

        <Link
          href={`/bookings/create?providerId=${skill._id}&providerName=${skill.name}&providerEmail=${skill.email}&serviceType=Skill Teaching&skill=${skill.skill}&duration=${skill.duration}&creditsRequired=${skill.creditsRequired}`}
          className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-lg transition"
        >
          📚 Learn Skill
        </Link>

      </div>

    ))}

  </div>

</section>
      {/* ================= MY LEARNINGS ================= */}


 <section id="reviews">

  <div className="flex items-center gap-3 mb-6">

    <FaStar className="text-3xl text-yellow-500" />

    <h2 className="text-3xl font-bold text-gray-900">
      Customer Reviews
    </h2>

  </div>

  <div className="grid md:grid-cols-2 gap-6">

    {reviews.map((review) => (

      <div
        key={review._id}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
      >

        {/* Header */}

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-5 flex justify-between items-center">

          <div>

            <h3 className="text-xl font-bold text-white">
              {review.customerName}
            </h3>

            <p className="text-yellow-100 text-sm">
              Verified Customer
            </p>

          </div>

          <div className="bg-white text-yellow-600 px-4 py-2 rounded-full font-bold shadow">
            ⭐ {review.rating}/5
          </div>

        </div>

        {/* Review */}

        <div className="p-6">

          <div className="flex justify-center text-2xl mb-5">

            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= review.rating ? "⭐" : "☆"}
              </span>
            ))}

          </div>

          <div className="bg-gray-50 rounded-2xl border p-5">

            <p className="text-gray-800 leading-7 italic text-center">
              "{review.comment}"
            </p>

          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-gray-700 font-medium">

            <FaCheckCircle className="text-green-600" />

            Reviewed by {review.customerName}

          </div>

        </div>

      </div>

    ))}

  </div>

</section>
{/* ================= EMERGENCY REQUESTS ================= */}
<section id="mylearning" className="mt-10">

  <div className="flex items-center gap-3 mb-5">

    <FaGraduationCap className="text-3xl text-yellow-600" />

    <h2 className="text-3xl font-bold text-gray-900">
      My Learnings
    </h2>

  </div>

  <div className="grid gap-4">

    {myLearnings.map((item) => (

      <div
        key={item._id}
        className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 shadow-sm"
      >

        <p className="font-bold text-yellow-700 flex items-center gap-2">
          📚 Skill Learning
        </p>

        <div className="mt-3 space-y-2 text-gray-800">

          <p className="flex items-center gap-2">
            <FaClipboardList className="text-blue-600" />
            <span className="font-semibold">Skill:</span>
            {item.service}
          </p>

          <p className="flex items-center gap-2">
            <FaUserTie className="text-green-600" />
            <span className="font-semibold">Teacher:</span>
            {item.providerName}
          </p>

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-purple-600" />
            <span className="font-semibold">Status:</span>

            <span
              className={`font-semibold ${
                item.status === "Completed"
                  ? "text-green-600"
                  : item.status === "Accepted"
                  ? "text-blue-600"
                  : "text-yellow-600"
              }`}
            >
              {item.status}
            </span>

          </p>

        </div>

      </div>

    ))}

  </div>

</section>
<section id="emergency" className="mt-10">

  <div className="flex items-center gap-3 mb-5">

    <FaExclamationTriangle className="text-3xl text-red-600" />

    <h2 className="text-3xl font-bold text-gray-900">
      Emergency Requests
    </h2>

  </div>

  <div className="space-y-4">

    {emergencies.map((emergency) => (

      <div
        key={emergency._id}
        className="bg-white border border-red-200 rounded-xl shadow-sm p-5"
      >

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {emergency.customerName}
        </h3>

        <div className="space-y-2 text-gray-800">

          <p className="flex items-center gap-2">
            <FaTools className="text-blue-600" />
            <span className="font-semibold">
              Service:
            </span>
            {emergency.serviceType}
          </p>

          <p>
            <span className="font-semibold text-gray-900">
              Description:
            </span>{" "}
            {emergency.description}
          </p>

        </div>

        <button
          onClick={() =>
            acceptEmergency(
              emergency._id
            )
          }
          className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          ✅ Accept
        </button>

      </div>

    ))}

  </div>

</section>


      </main>

    </div>

  </div>
);
}