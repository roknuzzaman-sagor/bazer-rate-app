"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  /* Redirect if not logged in + prefill name */
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("সাইন ইন করুন");
      router.push("/signin");
      return;
    }
    if (session?.user?.name) setName(session.user.name);
  }, [isPending, session, router]);

  if (isPending || !session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      toast.error("নাম লিখুন");
      return;
    }
    if (trimmed === session.user.name) {
      toast.error("আগের নামের সাথে মিল আছে");
      return;
    }

    setLoading(true);
    try {
      await authClient.updateUser({ name: trimmed });
      toast.success("তথ্য আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      toast.error(err?.message || "আপডেট ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="তথ্য আপডেট করুন"
      subtitle="আপনার নাম পরিবর্তন করুন"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            নাম
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রেজওয়ান আহমেদ"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary-green w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </form>
    </AuthCard>
  );
}