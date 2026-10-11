import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm font-medium text-gray-700">
          বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে!
        </p>

        <p className="text-center text-xs text-gray-500 sm:text-right">
          সকল দাম সম্ভাব্য, বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়!
        </p>
      </div>
    </footer>
  );
};

export default Footer;