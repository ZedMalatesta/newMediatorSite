export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="bg-teal-600 text-white font-bold text-base w-9 h-9 flex items-center justify-center rounded-lg">
              МОК
            </span>
            <div className="leading-tight">
              <span className="font-bold text-white text-base block">
                МедиаторОк
              </span>
              <span className="text-teal-400 text-xs font-medium">Проф</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-5">
            Professional Mediation Centre. Helping people change themselves and
            the world through training and practice.
          </p>
          <div className="flex gap-3">
            {[
              { label: "TG", href: "#" },
              { label: "IG", href: "#" },
              { label: "VK", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-teal-600 flex items-center justify-center text-xs font-bold text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="text-white font-semibold mb-4">About Institution</h4>
          <ul className="space-y-2 text-sm">
            {[
              "About Us",
              "Our Team",
              "Our Projects",
              "Negotiation League",
              "News",
              "Vacancies",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Mediator Training",
              "Advanced Training",
              "Mediation Procedure",
              "Psychological Counselling",
              "Corporate Training",
              "Divorce Services",
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
              <span className="text-teal-500 mt-0.5 flex-shrink-0">📍</span>
              <span>Minsk, ul. Korolya 9, office 126</span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500 flex-shrink-0">📞</span>
              <div className="space-y-1">
                <a
                  href="tel:+375298678240"
                  className="block hover:text-teal-400 transition-colors"
                >
                  +375 (29) 867‑82‑40
                </a>
                <a
                  href="tel:+375336899019"
                  className="block hover:text-teal-400 transition-colors"
                >
                  +375 (33) 689‑90‑19
                </a>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-500 flex-shrink-0">✉️</span>
              <a
                href="mailto:mediatorok.by@gmail.com"
                className="hover:text-teal-400 transition-colors break-all"
              >
                mediatorok.by@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>© МедиаторОк Проф · Professional Mediation Centre</span>
          <a href="#" className="hover:text-slate-400 transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
