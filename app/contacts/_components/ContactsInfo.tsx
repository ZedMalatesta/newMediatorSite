const socials = [
  { label: "Instagram", handle: "@mediatorok.by", href: "https://www.instagram.com/mediatorok.by/" },
  { label: "Telegram", handle: "t.me/MediatorOK", href: "https://t.me/MediatorOK" },
  { label: "Facebook", handle: "MediatorOk.by", href: "https://www.facebook.com/groups/MediatorOk/" },
];

export default function ContactsInfo() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Адрес
          </p>
          <p className="text-slate-900 font-semibold mb-1">
            Республика Беларусь, г. Минск, ул. Короля 9, кабинет 126
          </p>
          <p className="text-slate-500 text-sm mb-8">
            5 минут пешком от станции метро «Фрунзенская» или «Юбилейная площадь»
          </p>

          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Связаться
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+375298678240" className="text-slate-900 font-semibold hover:text-accent-600 transition-colors">
                +375 (29) 867-82-40
              </a>
            </li>
            <li>
              <a href="mailto:mediatorok.by@gmail.com" className="text-slate-900 font-semibold hover:text-accent-600 transition-colors">
                mediatorok.by@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Мы в соцсетях
          </p>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 hover:border-accent-300 transition-colors"
                >
                  <span className="text-slate-700 text-sm font-semibold">{s.label}</span>
                  <span className="text-slate-400 text-sm">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
