export default function TopBar() {
  return (
    <div className="bg-teal-700 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-medium">
            <span className="text-yellow-300">★</span> 4.9
            <span className="text-teal-300 ml-1">· 312 reviews</span>
          </span>
          <span className="hidden sm:block text-teal-400">|</span>
          <span className="hidden sm:block text-teal-200">Est. 2010</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+78001234567"
            className="hover:text-yellow-300 transition-colors font-medium"
          >
            +7 (800) 123-45-67
          </a>
          <span className="text-teal-400">Daily 9:30–18:00</span>
          <a
            href="#footer"
            className="bg-white text-teal-700 px-3 py-0.5 rounded font-semibold hover:bg-teal-50 transition-colors text-xs"
          >
            Book a consultation
          </a>
        </div>
      </div>
    </div>
  );
}
