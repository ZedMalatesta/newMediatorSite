import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <a href="/" className="inline-block mb-4">
            <Image
              src="/images/logos/logo.png"
              alt="МедиаторОк Проф"
              width={130}
              height={44}
              className="object-contain brightness-0 invert opacity-80"
            />
          </a>
          <p className="text-sm leading-relaxed mb-5">
            Учебно-практическое учреждение. Помогаем людям менять себя и мир
            вокруг, создавать новые ценности и поддерживать культуру ненасилия.
          </p>
          <div className="flex gap-3">
            {[
              { label: "TG", href: "#" },
              { label: "IG", href: "#" },
              { label: "FB", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-amber-500 flex items-center justify-center text-xs font-bold text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="text-white font-semibold mb-4">Об учреждении</h4>
          <ul className="space-y-2 text-sm">
            {["О нас", "Наши тренеры", "Наши специалисты"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-amber-400 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Услуги</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Обучение",
              "Проведение процедуры медиации",
              "Корпоративное обучение",
              "Психологическое консультирование",
              "Добрачное консультирование",
              "Конфликт-менеджмент",
              "«Развод супругов»",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-amber-400 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects + Contacts */}
        <div className="space-y-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Наши проекты</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Мы/медиаторы — за диалог!", href: "/fordialogue" },
                { label: "Интервизорская группа «Pro Mediation»", href: "/intervision" },
                { label: "Школа юного медиатора", href: "/school" },
                { label: "Летний интенсив медиаторов 2026", href: "/summerintensive2026" },
                { label: "Лига переговорщиков «Мастерская диалога»", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-amber-400 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>г. Минск, ул. Короля 9, каб. 126</li>
              <li>
                <a href="tel:+375298678240" className="hover:text-amber-400 transition-colors">
                  +375 (29) 867‑82‑40
                </a>
              </li>
              <li>
                <a href="tel:+375336899019" className="hover:text-amber-400 transition-colors">
                  +375 (33) 689‑90‑19
                </a>
              </li>
              <li>
                <a href="mailto:mediatorok.by@gmail.com" className="hover:text-amber-400 transition-colors break-all">
                  mediatorok.by@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>© УПУ «МедиаторОк Проф»</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Договор оферты</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Политика обработки персональных данных</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
