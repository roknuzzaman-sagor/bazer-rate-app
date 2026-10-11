"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthCard from "@/components/AuthCard";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    if (form.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (res?.error) {
        throw new Error(res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
      router.push("/signin");
    } catch (err) {
      toast.error(err?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* নাম */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            নাম
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="যেমন: রেজওয়ান আহমেদ"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>

        {/* ইমেইল */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            ইমেইল
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>

        {/* পাসওয়ার্ড */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>

        {/* পাসওয়ার্ড নিশ্চিত */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            placeholder="আবার লিখুন"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-green w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "লোড হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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

      {/* Social */}
      <SocialButtons />

      {/* Bottom link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="text-primary font-medium hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </AuthCard>
  );
}