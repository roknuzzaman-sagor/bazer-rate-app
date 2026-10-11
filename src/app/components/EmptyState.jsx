import Link from "next/link";

export default function EmptyState({
  icon = "🔍",
  title = "কিছু পাওয়া যায়নি",
  message = "দুঃখিত, এই মুহূর্তে কোনো তথ্য নেই।",
}) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">{message}</p>
      <Link href="/" className="btn-primary-green inline-block">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}