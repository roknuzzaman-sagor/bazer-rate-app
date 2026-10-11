"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  /* click outside → close */
  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট হয়েছে");
      setOpen(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-full pl-1 pr-3 py-1 transition"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
            {initial}
          </div>
        )}
        <span className="text-sm font-medium text-gray-800 hidden sm:inline">
          {user.name || "User"}
        </span>
        <svg
          className="w-3 h-3 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.5 7l4.5 4.5L14.5 7z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user.email}
            </p>
          </div>

          {/* Items */}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <span>👤</span>
            <span>আমার প্রোফাইল</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
          >
            <span>↩</span>
            <span>সাইন আউট</span>
          </button>
        </div>
      )}
    </div>
  );
}