export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  {
    label: "Об учреждении",
    href: "/aboutus",
    children: [
      { label: "О нас", href: "/aboutus" },
      { label: "Наши тренеры", href: "/trainers" },
    ],
  },
  { label: "Обучение", href: "#programs" },
  {
    label: "Услуги",
    href: "#services",
    children: [
      { label: "Проведение медиации", href: "/mediation" },
      { label: "Супружеская терапия", href: "/coupletherapy" },
      { label: "Корпоративное обучение", href: "/corporatemediatorok" },
      { label: "Психологическое консультирование", href: "/psycologicalcounseling" },
      { label: "Развод супругов", href: "#" },
    ],
  },
  {
    label: "Наши проекты",
    href: "#",
    children: [
      { label: "Школа юного медиатора", href: "#" },
      { label: "Летний интенсив 2026", href: "/summerintensive2026" },
      { label: "Летняя школа 2025", href: "#" },
      { label: "Интервизорская группа Pro Mediation", href: "#" },
    ],
  },
  { label: "Новости", href: "#" },
  { label: "Контакты", href: "#footer" },
];

export const promos = [
  "с 1 июня — Семейная медиация как технология разрешения семейных кризисов",
  "1 июня — Обучение медиации (дистанционный курс)",
  "13 июня — Обучение медиации, очно, Минск",
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
    href: "#",
  },
  {
    iconSrc: "/images/icons/service-corporate.png",
    name: "Корпоративное обучение",
    description:
      "Система подготовки персонала, разработанная для сотрудников Вашей компании.",
    href: "#",
  },
  {
    iconSrc: "/images/icons/service-divorce.png",
    name: "Услуга «Развод супругов»",
    description:
      "Пакет услуг по работе с семьёй по сопровождению развода.",
    href: "#",
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
};

export const programs: Program[] = [
  {
    title: "Семейная медиация как технология разрешения семейных кризисов",
    startDate: "с 1 июня",
    format: "online",
    formatLabel: "Онлайн",
    duration: "Авторская программа Оксаны Шульги",
    certificate: "Свидетельство об окончании",
  },
  {
    title: "Обучение медиации — дистанционный курс",
    startDate: "1 июня",
    format: "online",
    formatLabel: "Онлайн",
    duration: "Профессиональная переподготовка",
    certificate: "Справка государственного образца",
  },
  {
    title: "Обучение медиации — очно, Минск",
    startDate: "13 июня",
    format: "in-person",
    formatLabel: "Очно",
    duration: "Профессиональная переподготовка",
    certificate: "Справка государственного образца",
  },
  {
    title: "Школа юного медиатора «Территория взаимопонимания»",
    startDate: "Июль 2026",
    format: "in-person",
    formatLabel: "Очно · Интенсив",
    duration: "10 дней · Возраст 13–17 лет",
    certificate: "Сертификат участника",
  },
  {
    title: "Летний интенсив — «Медиатор как личность и как профессионал»",
    startDate: "4–6 июля, Гродно",
    format: "in-person",
    formatLabel: "Очно · Выездной",
    duration: "3 дня · Интенсивный курс",
    certificate: "Свидетельство об окончании",
  },
  {
    title: "Программа повышения квалификации по конфликтологии и переговорам",
    startDate: "Сентябрь 2026",
    format: "both",
    formatLabel: "Онлайн и очно",
    duration: "Расширенная программа",
    certificate: "Справка государственного образца",
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
      "Старший преподаватель кафедры психологии и коррекционной работы МГУ им. Кулешова, медиатор",
    initials: "АД",
    photoSrc: "/images/experts/dzhanashia.jpg",
  },
  {
    name: "Александра Габриянчик",
    role: "Юрист · Медиатор",
    credentials:
      "Старший преподаватель кафедры гражданского права и процесса ГрГУ им. Янки Купалы, юрист, медиатор, тренер медиаторов",
    initials: "АГ",
    photoSrc: "/images/experts/gabryanchik.jpg",
  },
  {
    name: "Лариса Данькова",
    role: "Юрист · Медиатор",
    credentials:
      "Юрист, аспирантура НЦЗПИ, председатель Гродненской областной общественной наблюдательной комиссии, медиатор, тренер медиаторов",
    initials: "ЛД",
    photoSrc: "/images/experts/dankova.jpg",
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
