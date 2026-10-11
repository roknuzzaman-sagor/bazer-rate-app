import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main py-20 text-center">
      <div className="text-7xl md:text-8xl mb-4">🔍</div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">৪০৪</h1>

      <p className="text-base md:text-lg text-gray-600 mt-3 mb-2">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>

      <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
        লিংকটি হয়তো ভুল, অথবা পেজটি সরিয়ে ফেলা হয়েছে। হোম পেজে ফিরে গিয়ে
        আবার চেষ্টা করুন।
      </p>

      <Link href="/" className="btn-primary-green inline-block">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}