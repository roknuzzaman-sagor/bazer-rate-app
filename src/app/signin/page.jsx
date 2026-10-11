"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: form.email.trim(),
        password: form.password,
      });

      if (res?.error) {
        throw new Error(res.error.message || "সাইন ইন ব্যর্থ হয়েছে");
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(err?.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            ইমেইল
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            required
            minLength={8}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-green w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "লোড হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-500">অথবা</span>
        </div>
      </div>

      {/* Social buttons */}
      <SocialButtons />

      {/* Bottom link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="text-primary font-medium hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </AuthCard>
  );
}