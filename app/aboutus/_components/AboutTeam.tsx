import Image from "next/image";

type Member = {
  name: string;
  initials: string;
  role: string;
  photo: string | null;
  tags: string[];
  bio: string[];
  education: string[];
  contacts: { label: string; value: string; href?: string }[];
  specialization?: string[];
};

const team: Member[] = [
  {
    name: "Оксана Шульга",
    initials: "ОШ",
    role: "Директор УПУ «МедиаторОк Проф»",
    photo: "/images/experts/shulga.jpg",
    tags: [
      "Кандидат психологических наук",
      "Доцент",
      "Медиатор",
      "Семейный психолог",
      "Гештальт-терапевт",
      "Детский психолог",
      "Конфликтолог",
      "Психолингвист",
    ],
    bio: [
      "Директор РОО «Белорусская Лига семейных медиаторов». Провела более 500 медиаций.",
      "Свыше 100 научных и научно-популярных публикаций по проблемам семейной, школьной и восстановительной медиации.",
      "Клиенты из 22 стран мира. Более 30 000 часов консалтинга, консультирования и проведения тренингов. 20 лет в качестве тренера, психотерапевта и коуча.",
      "Автор метафорических карт. Разработала более 80 авторских тренинговых программ.",
    ],
    education: [
      "1991–1996 — БГПУ им. М. Танка, историко-иностранный факультет (диплом с отличием)",
      "1996–1998 — Национальный институт образования, магистратура (психология)",
      "2000–2005 — Аспирантура Национального института образования",
      "2015 — УПУ «Центр «Медиация и право» — медиатор",
    ],
    contacts: [
      { label: "Email", value: "oksana-shulga74@mail.ru", href: "mailto:oksana-shulga74@mail.ru" },
      { label: "Телефон", value: "+375 (29) 867-82-40", href: "tel:+375298678240" },
      { label: "Города", value: "Минск, Гродно" },
    ],
  },
  {
    name: "Александра Габриянчик",
    initials: "АГ",
    role: "Директор ООО «МедиаторОк»",
    photo: null,
    tags: [
      "Медиатор",
      "Тренер медиаторов",
      "Юрист",
      "Старший преподаватель ГрГУ",
    ],
    bio: [
      "Старший преподаватель кафедры гражданского права и процесса УО «Гродненский государственный университет им. Янки Купалы».",
      "Имеет более 40 публикаций по проблемам гражданского и хозяйственного судопроизводства, альтернативным способам разрешения споров.",
    ],
    education: [
      "2009 — Юридический факультет ГрГУ им. Янки Купалы, «Правоведение»",
      "2016 — УПУ «Центр Медиация и право», «Медиация. Базовый и углублённый курс» (свидетельство № 288)",
      "2017 — Аспирантура БГУ",
    ],
    contacts: [
      { label: "Email", value: "alvart87@gmail.com", href: "mailto:alvart87@gmail.com" },
      { label: "Телефон", value: "+375 (29) 281-68-59", href: "tel:+375292816859" },
      { label: "Города", value: "Гродно, Минск" },
    ],
    specialization: ["Семейная медиация", "Коммерческая медиация"],
  },
  {
    name: "Елена Рагулина",
    initials: "ЕР",
    role: "Бизнес-тренер · Коуч ICU",
    photo: null,
    tags: [
      "Бизнес-тренер",
      "Медиатор",
      "Практический психолог",
      "Сертифицированный коуч ICU / ICTA",
      "Консультант по управлению персоналом",
    ],
    bio: [
      "Богатый практический опыт во всех направлениях работы HR-служб: подбор и адаптация, обучение и аттестация, развитие корпоративной культуры и повышение мотивации сотрудников.",
      "Опыт работы в реальном бизнесе на руководящих должностях, на позициях приглашённого коуча и консультанта топ-менеджеров.",
      "Автор более 40 публикаций и книг, посвящённых развитию творческого потенциала студентов и сотрудников, а также технологиям обучения взрослых.",
    ],
    education: [
      "1998 — Высшее педагогическое образование, учитель химии и биологии",
      "2002 — Республиканский институт профессионального образования, практический психолог",
      "2011 — Профессиональный коуч ICU",
      "2023 — Программа «КПТ+. Базовые техники КПТ для консультирования и коучинга»",
    ],
    contacts: [
      { label: "Email", value: "elena14_07@mail.ru", href: "mailto:elena14_07@mail.ru" },
      { label: "Телефон", value: "+375 (29) 181-82-58", href: "tel:+375291818258" },
      { label: "Город", value: "Минск" },
    ],
  },
];

export default function AboutTeam() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Люди
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Наша команда
          </h2>
        </div>

        <div className="space-y-10">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col md:flex-row gap-8"
            >
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-accent-200 shadow relative">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      className="object-cover object-top"
                      sizes="144px"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-2xl font-bold text-slate-600">
                      {m.initials}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-slate-900 mb-0.5">{m.name}</h3>
                <p className="text-accent-600 font-semibold text-sm mb-4">{m.role}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-accent-50 border border-accent-200 text-accent-800 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bio */}
                  <div>
                    <ul className="space-y-2 mb-4">
                      {m.bio.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-1.5" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {m.specialization && (
                      <div className="mt-3">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5">
                          Специализация в медиации
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {m.specialization.map((s) => (
                            <span key={s} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Education + Contacts */}
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                      Образование
                    </p>
                    <ul className="space-y-1.5 mb-5">
                      {m.education.map((e, i) => (
                        <li key={i} className="text-slate-500 text-xs leading-relaxed">
                          {e}
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                      Контакты
                    </p>
                    <ul className="space-y-1">
                      {m.contacts.map((c) => (
                        <li key={c.label} className="text-sm text-slate-600">
                          <span className="text-slate-400 text-xs">{c.label}: </span>
                          {c.href ? (
                            <a href={c.href} className="hover:text-accent-600 transition-colors">
                              {c.value}
                            </a>
                          ) : (
                            c.value
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
