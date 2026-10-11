export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-10">
      <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-gray-800 font-medium text-center md:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-500 text-center md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}