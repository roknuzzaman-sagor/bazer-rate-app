"use client";
import Link from "next/link";
import BengaliDate from "./BengaliDate";
import CategoryNav from "./CategoryNav";

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

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container-main">
        <div className="flex items-center justify-between gap-3 py-4">
          <Logo />

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="btn-primary-green text-sm px-5 py-2.5"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <CategoryNav />
      </div>
    </header>
  );
}