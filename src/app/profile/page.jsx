"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function ProfileSkeleton() {
  return (
    <div className="container-main py-8 max-w-3xl">
      <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-2" />
      <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-6" />
      <div className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />
      <div className="h-48 bg-white rounded-2xl border border-gray-100 animate-pulse mt-5" />
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) return <ProfileSkeleton />;

  const user = session.user;
  const initial = (user?.name || "?").charAt(0).toUpperCase();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="container-main py-8 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        আমার প্রোফাইল
      </h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 flex items-center gap-4">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
            {initial}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-lg truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>

        <button
          onClick={handleSignOut}
          className="border border-red-300 text-red-500 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 transition shrink-0"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 mt-5">
        <h2 className="font-bold text-gray-900 mb-4">তথ্য</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          নাম
        </label>
        <input
          type="text"
          value={user.name || ""}
          disabled
          readOnly
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
        />

        <Link
          href="/profile/update"
          className="btn-primary-green w-full block text-center mt-4"
        >
          আপডেট
        </Link>
      </div>
    </div>
  );
}