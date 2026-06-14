export default function Footer() {
  return (
    <footer id="footer" className="bg-zinc-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-teal-600 text-white font-bold text-lg w-9 h-9 flex items-center justify-center rounded-lg">
              M
            </span>
            <span className="font-bold text-white text-lg">Mediator</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Professional mediation & conflict resolution training since 2010.
          </p>
          <div className="flex gap-3">
            {["TG", "VK", "YT"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-teal-600 flex items-center justify-center text-xs font-bold transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <h4 className="text-white font-semibold mb-4">Programs</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Short-term Programs",
              "Extended Programs",
              "Professional Certification",
              "Free Events",
              "Online Learning",
              "Corporate Training",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Directions */}
        <div>
          <h4 className="text-white font-semibold mb-4">Directions</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Conflict Resolution",
              "Mediation",
              "Team Building",
              "Leadership Training",
              "Crisis Management",
              "Stress Management",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contacts</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="text-teal-500 mt-0.5">📍</span>
              <span>123 Professional Ave, Suite 400, New York, NY 10001</span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">📞</span>
              <a href="tel:+78001234567" className="hover:text-teal-400 transition-colors">
                +7 (800) 123-45-67
              </a>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">✉️</span>
              <a href="mailto:info@mediator.pro" className="hover:text-teal-400 transition-colors">
                info@mediator.pro
              </a>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500">🕐</span>
              <span>Daily 9:30–18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2010–2026 Mediator Professional Training Institute</span>
          <span>INN 7801000000 · All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
