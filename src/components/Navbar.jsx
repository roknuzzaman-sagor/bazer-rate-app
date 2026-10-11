"use client";

import Link from "next/link";
import BengaliDate from "./BengaliDate";
import CategoryNav from "./CategoryNav";
import ProfileDropdown from "./ProfileDropdown";
import { authClient } from "@/lib/auth-client";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white text-2xl shadow-sm">
        🛒
      </div>
      <div className="leading-tight">
        <div className="font-bold text-xl text-gray-900">বাজার দর</div>
        <BengaliDate className="text-xs text-gray-500" />
      </div>
    </Link>
  );
}

function AuthSkeleton() {
  return <div className="h-9 w-28 bg-gray-100 rounded-full animate-pulse" />;
}

function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <AuthSkeleton />;

  if (session?.user) {
    return <ProfileDropdown user={session.user} />;
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/signin"
        className="text-sm font-medium text-gray-700 hover:text-primary"
      >
        সাইন ইন
      </Link>
      <Link href="/signup" className="btn-primary-green text-sm px-5 py-2.5">
        সাইন আপ
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container-main">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3 py-4">
          <Logo />
          <AuthButtons />
        </div>

        {/* Category row */}
        <CategoryNav />
      </div>
    </header>
  );
}