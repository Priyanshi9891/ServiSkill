
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
 //import NotificationBell from "../NotificationBell";
import NotificationBell from "@/components/common/NotificationBell";

export default function Navbar() {
  const { data: session } = useSession();

  const [credits, setCredits] = useState(0);
const [unreadCount, setUnreadCount] =
  useState(0);
  useEffect(() => {
    if (session?.user?.id) {
      loadCredits();
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

  async function loadCredits() {
    try {
      const res = await fetch(
        `/api/credits?userId=${session.user.id}`
      );

      const data = await res.json();

      setCredits(data.credits || 0);
    } catch (error) {
      console.log(error);
    }
  }
 const loadCount = async () => {
  try {
    if (!session?.user?.id) return;

    const res = await fetch(
      `/api/notifications/unread?userId=${session.user.id}`
    );

    if (!res.ok) {
      console.log(
        "Notification API Error:",
        res.status
      );
      return;
    }

    const data = await res.json();

    setUnreadCount(data.count || 0);
  } catch (error) {
    console.log(
      "Notification fetch error:",
      error
    );
  }
};
//   return (
//     <nav className="bg-white shadow sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

//         {/* Logo */}
//         <h1 className="text-3xl font-bold text-blue-600">
//           ServiSkill
//         </h1>

//         {/* Navigation */}
//         <div className="flex items-center gap-6">

//           <Link
//             href="/dashboard/customer"
//             className="font-medium hover:text-blue-600"
//           >
//             Home
//           </Link>

//           <Link
//             href="/my-dashboard"
//             className="font-medium hover:text-blue-600"
//           >
//             My Dashboard
//           </Link>

//           <Link
//             href="/credits"
//             className="bg-yellow-500 text-white px-4 py-2 rounded-full"
//           >
//             Wallet
//           </Link>

//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">

//           {/* Credits */}
//           <div className="bg-yellow-100 px-4 py-2 rounded-full font-semibold">
//             🪙 {credits} Credits
//           </div>

//           {/* Notification */}
        
// <Link
//   href="/notifications"
//   className="relative"
// >
//   🔔

//   {unreadCount > 0 && (
//     <span
//       className="
//       absolute
//       -top-2
//       -right-2
//       bg-red-500
//       text-white
//       text-xs
//       rounded-full
//       px-2
//     "
//     >
//       {unreadCount}
//     </span>
//   )}
// </Link>

//           {/* Profile */}
//           <img
//             src={
//               session?.user?.image ||
//               `https://ui-avatars.com/api/?name=${session?.user?.name}`
//             }
//             alt="profile"
//             className="w-10 h-10 rounded-full"
//           />

//           <span className="font-medium">
//             {session?.user?.name}
//           </span>

//           {/* Logout */}
//           <button
//             onClick={() =>
//               signOut({
//                 callbackUrl: "/",
//               })
//             }
//             className="bg-red-500 text-white px-4 py-2 rounded-lg"
//           >
//             Logout
//           </button>

//         </div>

//       </div>
//     </nav>
//   );
return (
  <nav className="bg-white shadow sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-4">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            ServiSkill
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">

          <Link
            href="/dashboard/customer"
            className="text-black
      font-medium
      relative
      transition-all
      duration-300
      hover:text-blue-600
      after:absolute
      after:left-0
      after:-bottom-1
      after:w-0
      after:h-[2px]
      after:bg-blue-600
      after:transition-all
      after:duration-300
      hover:after:w-full"
          >
            Home
          </Link>

          <Link
            href="/my-dashboard"
            className="text-black
      font-medium
      relative
      transition-all
      duration-300
      hover:text-blue-600
      after:absolute
      after:left-0
      after:-bottom-1
      after:w-0
      after:h-[2px]
      after:bg-blue-600
      after:transition-all
      after:duration-300
      hover:after:w-full"
          >
            My Dashboard
          </Link>

         

        </div>

        {/* Right Side */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3 md:gap-4">

          {/* Credits */}
          <div className="bg-yellow-100 text-gray-600 px-4 py-2 rounded-full font-semibold whitespace-nowrap">
            🪙 {credits} Credits
          </div>
<Link
    href="/credits"
    className="
      bg-yellow-500
      text-white
      px-4
      py-2
      rounded-full
      hover:bg-yellow-600
      transition
      whitespace-nowrap
    "
  >
    Wallet
  </Link>
          {/* Notification */}
          <Link
            href="/notifications"
            className="relative text-2xl"
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
                  min-w-[20px]
                  h-5
                  flex
                  items-center
                  justify-center
                  px-1
                "
              >
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <img
            src={
              session?.user?.image ||
              `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
            alt="profile"
            className="w-10 h-10 rounded-full border border-gray-200"
          />

          <span className="font-medium text-black max-w-[120px] truncate">
            {session?.user?.name}
          </span>

          {/* Logout */}
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-red-600
              transition
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  </nav>
);
}