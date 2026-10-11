import BengaliDate from "./BengaliDate";
import Image from 'next/image';


export default function Hero() {
  return (
    <section className="bg-[#ffffff] rounded-2xl p-6 md:p-10 lg:p-12 my-6 relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative z-10">
          <span className="inline-flex items-center bg-[#d4efd8] text-[#166534] text-xs md:text-sm font-medium px-3 py-1.5 rounded-full mb-5">
            <BengaliDate />
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed max-w-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn-primary-green inline-block mt-6 md:mt-8"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center md:justify-end relative">
          <Image src='/bazar-hero.png' alt='banner' width={500} height={300} priority/>
        </div>
      </div>
    </section>
  );
}