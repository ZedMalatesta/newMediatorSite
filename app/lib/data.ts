import { liveDate } from "./liveDates";
import { enrolmentStatus, isPast, isoDay, parseRuDate } from "./lifecycle";
import { liveNav } from "./liveNav";

export type NavLink = {
  label: string;
  /** Absent when the item only opens its submenu and links nowhere itself. */
  href?: string;
  children?: { label: string; href: string }[];
};

/** The live menu's labels use straight quotes and hyphens for dashes. */
const polish = (label: string) =>
  label
    .replace(/"([^"]*)"/g, "«$1»")
    .replace(/\s+-\s+/g, " — ")
    .replace(/\/\s+/g, "/")
    .replace(/[:.]+»$/, "»")
    .trim();

/**
 * Two live menu entries point at Tilda's /error page because the live site has
 * no content for them. This site does have pages there, so they keep working
 * links instead of inheriting the dead ones.
 */
const LOCAL_PAGES: Record<string, string> = {
  "Документы для проведения медиации": "/mediationdocuments",
  "Диагностика конфликтов": "/conflictdiagnostics",
};

/**
 * Audience-first entry point (change request point 6) - not on the live menu.
 * The audience pages remain the source of truth for what each one contains.
 */
const AUDIENCES: NavLink = {
  label: "Направления",
  children: [
    { label: "Будущим медиаторам", href: "/audience/buduschim-mediatoram" },
    { label: "Психологам и специалистам", href: "/audience/specialistam" },
    { label: "Родителям и семьям", href: "/audience/roditelyam-i-semyam" },
    { label: "Организациям и бизнесу", href: "/audience/organizaciyam" },
  ],
};

/**
 * The site menu: the live site's own menu (synced into liveNav.ts), with the
 * audience entry added after «Обучение». Deriving it means a page added to or
 * renamed on the live menu shows up here on the next sync instead of drifting.
 *
 * Items that only open a submenu on the live site have no href here either.
 */
export const navLinks: NavLink[] = liveNav.flatMap((item) => {
  const link: NavLink = {
    label: polish(item.label),
    ...(item.href ? { href: item.href } : {}),
    ...(item.children
      ? {
          children: item.children.map((c) => ({
            label: polish(c.label),
            href: c.href === "/error" ? (LOCAL_PAGES[c.label] ?? c.href) : c.href,
          })),
        }
      : {}),
  };
  return item.href === "/obuchenie" ? [link, AUDIENCES] : [link];
});

/**
 * Start dates are quoted from the live programme pages (synced into
 * liveDates.ts), not typed here. They were hand-copied twice and were stale
 * within weeks both times, because the live site keeps moving its courses.
 */
const TBA = "Дата уточняется";
const starts = {
  familyMediation: liveDate("semeynayamediation") ?? TBA,
  mediatorRemote: liveDate("obucheniemediator", /дистанц/i) ?? TBA,
  mediatorMinsk: liveDate("obucheniemediator", /Минск/i) ?? TBA,
  practicalConflictology: liveDate("practicalconflictology") ?? TBA,
};

export const promos = [
  `${starts.familyMediation} — Семейная медиация как технология разрешения семейных кризисов`,
  `${starts.mediatorRemote} — Обучение медиации (дистанционный курс)`,
  `${starts.mediatorMinsk} — Обучение медиации, очно, Минск`,
  "Школа юного медиатора «Территория взаимопонимания»",
];

export const stats = [
  { value: "7", label: "Экспертов-практиков" },
  { value: "70%", label: "Практики в обучении" },
  { value: "6", label: "Направлений услуг" },
  { value: "500+", label: "Клиентов" },
];

export const forWhom = [
  "Для тех, кто хочет стать медиатором",
  "Для тех, кто хочет повысить квалификацию в области психологии, конфликтологии, переговоров, медиации",
  "Для тех, кто хочет разрешить любой спор посредством медиации: разрешение семейных, коммерческих, гражданско-правовых, трудовых споров",
];

export const services = [
  {
    iconSrc: "/images/icons/service-training.png",
    name: "Подготовка медиаторов",
    description:
      "Обучающая программа, утверждённая Министерством юстиции Республики Беларусь.",
    href: "#programs",
  },
  {
    iconSrc: "/images/icons/service-webinar.png",
    name: "Программы повышения квалификации, вебинары",
    description:
      "Обучающие программы, вебинары в области медиации и конфликтологии.",
    href: "#programs",
  },
  {
    iconSrc: "/images/icons/service-mediation.png",
    name: "Проведение процедуры медиации",
    description:
      "Решение конфликтов без суда. Сохраним ваши нервы, время и деньги.",
    href: "/mediation",
  },
  {
    iconSrc: "/images/icons/service-counseling.png",
    name: "Психологическое консультирование",
    description: "Индивидуальное и для семейных пар, очно и онлайн.",
    href: "/psycologicalcounseling",
  },
  {
    iconSrc: "/images/icons/service-corporate.png",
    name: "Корпоративное обучение",
    description:
      "Система подготовки персонала, разработанная для сотрудников Вашей компании.",
    href: "/corporatemediatorok",
  },
  {
    iconSrc: "/images/icons/service-divorce.png",
    name: "Услуга «Развод супругов»",
    description:
      "Пакет услуг по работе с семьёй по сопровождению развода.",
    href: "/divorceservice",
  },
];

export const news = [
  {
    text: "Медиаторы МедиаторОк приняли участие в программе «Окна города», где подробно и воодушевлённо рассказали о медиации и её практике в Беларуси и мире.",
  },
  {
    text: "Оксана Шульга приняла участие в I Международном конгрессе «БЛАГОПОЛУЧИЕ СЕМЬИ — БЛАГОПОЛУЧИЕ СТРАНЫ: МЕДИАЦИЯ ОБЪЕДИНЯЕТ» 30 ноября — 1 декабря 2024 г. Организатором Конгресса выступила Национальная ассоциация семейных медиаторов, г. Москва. Цель Конгресса — создание пространства открытых дискуссий для обсуждения актуальных проблем в вопросах сохранения семей и защиты интересов детей, поддержания традиционных семейных ценностей в условиях современных реалий. Было подписано соглашение о сотрудничестве между Национальной ассоциацией семейных медиаторов и общественным объединением «Лига семейных медиаторов».",
  },
];

export const advantages = [
  {
    iconSrc: "/images/icons/uniqueness.png",
    title: "Уникальность",
    description:
      "Наши программы уникальны по содержанию и построены на интеграции нескольких наук: психологии, философии, юриспруденции, социологии, экономике.",
  },
  {
    iconSrc: "/images/icons/relevance.png",
    title: "Актуальность",
    description:
      "Обучаем современным технологиям коммуникации: НЛП, транзактный анализ, процессуальная коммуникация, СПИН, LAST и др.",
  },
  {
    iconSrc: "/images/icons/practice.png",
    title: "Практика",
    description:
      "Наши программы включают 70% практики и 30% теории.",
  },
  {
    iconSrc: "/images/icons/certificate.png",
    title: "Справка государственного образца",
    description:
      "После успешного прохождения обучения слушателю вручается справка государственного образца.",
  },
  {
    iconSrc: "/images/icons/quality.png",
    title: "Гарантированное качество",
    description:
      "Наши тренеры — опытные практикующие специалисты, востребованные в своей сфере.",
  },
  {
    iconSrc: "/images/icons/support.png",
    title: "Поддержка",
    description:
      "Получите персональное сопровождение и помощь после обучения.",
  },
];

export type ProgramFormat = "in-person" | "online" | "both";

export type Program = {
  title: string;
  startDate: string;
  format: ProgramFormat;
  formatLabel: string;
  duration: string;
  certificate: string;
  /** The programme's own page, which its card leads to as on the live catalogue. */
  href: string;
} & (
  /** Runs in intakes: once its start has passed it stays listed, marked as started. */
  | { kind: "course" }
  /** Runs once: it leaves the catalogue the day after `ends` (ISO). */
  | { kind: "event"; ends: string }
);

/** A programme as the catalogue shows it on a given day. */
export type CurrentProgram = Program & {
  /** The start date has passed; the next intake is not announced yet. */
  started: boolean;
};

/**
 * The catalogue on `now`: events that are over are gone, and a course whose
 * start has passed says so instead of offering a date in the past. Pages call
 * this when they are built (nightly, by the deploy schedule), not the browser,
 * so the built HTML and the running page agree.
 */
export function currentPrograms(now: Date = new Date(), list: Program[] = programs): CurrentProgram[] {
  return list
    .filter((p) => p.kind === "course" || !isPast(p.ends, now))
    .map((p) => {
      const start = p.kind === "course" ? parseRuDate(p.startDate, now) : undefined;
      const started = start !== undefined && enrolmentStatus(isoDay(start), now) === "closed";
      return { ...p, started };
    });
}

export const programs: Program[] = [
  {
    title: "Семейная медиация как технология разрешения семейных кризисов",
    startDate: starts.familyMediation,
    format: "online",
    formatLabel: "Онлайн",
    duration: "Авторская программа Оксаны Шульги",
    certificate: "Свидетельство об окончании",
    href: "/semeynayamediation",
    kind: "course",
  },
  {
    title: "Обучение медиации — дистанционный курс",
    startDate: starts.mediatorRemote,
    format: "online",
    formatLabel: "Онлайн",
    duration: "Профессиональная переподготовка",
    certificate: "Справка государственного образца",
    href: "/obucheniemediator",
    kind: "course",
  },
  {
    title: "Обучение медиации — очно, Минск",
    startDate: starts.mediatorMinsk,
    format: "in-person",
    formatLabel: "Очно",
    duration: "Профессиональная переподготовка",
    certificate: "Справка государственного образца",
    href: "/obucheniemediator",
    kind: "course",
  },
  {
    title: "Школа юного медиатора «Территория взаимопонимания»",
    startDate: "Июль 2026",
    format: "in-person",
    formatLabel: "Очно · Интенсив",
    duration: "10 дней · Возраст 13–17 лет",
    certificate: "Сертификат участника",
    href: "/school",
    // The live site gives only the month; the end of it is the latest it can run.
    kind: "event",
    ends: "2026-07-31",
  },
  {
    title: "Летний интенсив — «Медиатор как личность и как профессионал»",
    startDate: "4–6 июля, Гродно",
    format: "in-person",
    formatLabel: "Очно · Выездной",
    duration: "3 дня · Интенсивный курс",
    certificate: "Свидетельство об окончании",
    href: "/summerschool2025",
    // 4–6 July 2025, as the live home page announced it.
    kind: "event",
    ends: "2025-07-06",
  },
  {
    title: "Практическая конфликтология: навыки для жизни, работы и любви",
    startDate: starts.practicalConflictology,
    format: "online",
    formatLabel: "Онлайн",
    duration: "6 лекций в записи и 2 онлайн-встречи",
    certificate: "Сертификат об обучении государственного образца",
    href: "/practicalconflictology",
    kind: "course",
  },
];

export const disputeTypes = [
  {
    iconSrc: "/images/icons/dispute-commercial.png",
    label: "Споры по сделкам между гражданами и юридическими лицами",
  },
  {
    iconSrc: "/images/icons/dispute-child.png",
    label: "Порядок общения с ребёнком, выплата алиментов",
  },
  {
    iconSrc: "/images/icons/dispute-divorce.png",
    label: "Юридические и психологические аспекты развода",
  },
  {
    iconSrc: "/images/icons/dispute-labor.png",
    label: "Трудовые споры",
  },
  {
    iconSrc: "/images/icons/dispute-property.png",
    label: "Раздел совместно нажитого имущества",
  },
  {
    iconSrc: "/images/icons/dispute-inheritance.png",
    label: "Споры о наследстве",
  },
];

export const mediationPrinciples = [
  {
    title: "Добровольность",
    description: "Все стороны участвуют по собственной воле.",
  },
  {
    title: "Равноправие сторон",
    description: "Каждый участник имеет равные права и голос в процессе.",
  },
  {
    title: "Нейтральность медиатора",
    description: "Медиатор не занимает ничью сторону и не навязывает решений.",
  },
  {
    title: "Конфиденциальность",
    description: "Всё сказанное на медиации остаётся строго приватным.",
  },
];

export const mediationAdvantages = [
  "НЕ предполагает навязанных кем-либо решений",
  "Направлена не на разрыв, а на сохранение и развитие отношений",
  "Помогает найти решение, учитывающее интересы и возможности всех участников спора и в рамках закона",
  "Дешевле и быстрее, чем судебный процесс",
  "Учитывает эмоциональные и личностные аспекты спора",
  "Вся информация, относящаяся к медиации, конфиденциальна",
  "Обеспечивает результат по принципу «выигрыш-выигрыш»",
  "Способствует развитию коммуникативных навыков",
  "Ориентирована на БУДУЩЕЕ",
];

export const experts = [
  {
    name: "Оксана Шульга",
    role: "Директор",
    credentials:
      "Директор УПУ «МедиаторОк Проф», медиатор, семейный психолог, детский психолог, гештальт-терапевт, конфликтолог",
    initials: "ОШ",
    photoSrc: "/images/experts/shulga.jpg",
  },
  {
    name: "Алексей Усенко",
    role: "Медиатор · Преподаватель",
    credentials:
      "Медиатор, преподаватель конфликтологии, психолог-консультант, коуч",
    initials: "АУ",
    photoSrc: "/images/experts/usenko.jpg",
  },
  {
    name: "Марина Бойко",
    role: "Тренер",
    credentials:
      "Кандидат психологических наук, тренер медиаторов, психолог",
    initials: "МБ",
    photoSrc: "/images/experts/boyko.jpg",
  },
  {
    name: "Арсен Джанашиа",
    role: "Старший преподаватель",
    credentials:
      "Старший преподаватель кафедры психологии и коррекционной работы Могилевского государственного университета им. Кулешова, медиатор",
    initials: "АД",
    photoSrc: "/images/experts/dzhanashia.jpg",
  },
  {
    // Formerly Габриянчик - the live home and trainers pages use her
    // current surname; /aboutus and /corporatemediatorok still the old one.
    name: "Александра Вартанова",
    role: "Юрист · Медиатор",
    credentials:
      "Старший преподаватель кафедры гражданского права и процесса ГрГУ им. Янки Купалы, юрист, медиатор, тренер медиаторов",
    initials: "АВ",
    photoSrc: "/images/experts/gabryanchik.jpg",
  },
  {
    name: "Лариса Данькова",
    role: "Юрист · Медиатор",
    credentials:
      "Юрист, аспирантура НЦЗПИ, председатель Гродненской областной общественной наблюдательной комиссии, медиатор, тренер медиаторов",
    initials: "ЛД",
    photoSrc: "/images/experts/dankova.png",
  },
  {
    name: "Александр Енджеевский",
    role: "Психолог · Тренер",
    credentials:
      "Психолог, оратор, актёр, автор и ведущий тренингов, семейный медиатор, тренер медиаторов",
    initials: "АЕ",
    photoSrc: "/images/experts/endzheevsky.jpg",
  },
];

export const testimonialImages = [
  "/images/testimonials/review-1.jpg",
  "/images/testimonials/review-2.jpg",
  "/images/testimonials/review-3.png",
  "/images/testimonials/review-4.png",
  "/images/testimonials/review-5.jpg",
  "/images/testimonials/review-6.png",
];

export const telegramBenefits = [
  {
    icon: "📰",
    title: "Полезная информация",
    description:
      "Статьи, обсуждения, техники и кейсы для медиаторов, психологов и юристов",
  },
  {
    icon: "🎟️",
    title: "Бесплатные мероприятия",
    description:
      "Приглашения на бесплатные мероприятия, конференции и вебинары практикующих специалистов",
  },
  {
    icon: "📖",
    title: "Литература",
    description:
      "Скачивайте актуальные и полезные книги и статьи для специалистов",
  },
  {
    icon: "🔔",
    title: "Анонсы обучения",
    description:
      "Узнавай первым о наших образовательных программах, курсах и мероприятиях. Получай выгодные предложения",
  },
];
