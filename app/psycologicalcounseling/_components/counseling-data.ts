export const concerns: string[] = [
  "Тревога и стресс",
  "Эмоциональное выгорание",
  "Сложности в отношениях",
  "Низкая самооценка",
  "Жизненные кризисы",
  "Одиночество",
  "Проблемы с границами",
];

export type Format = {
  title: string;
  description: string;
};

export const formats: Format[] = [
  { title: "Индивидуальные консультации", description: "Очно в Минске или Гродно либо онлайн по Zoom" },
  { title: "Парные и семейные консультации", description: "Совместная работа с парой или семьёй" },
];

export type PriceRow = {
  service: string;
  price: string;
};

export const prices: PriceRow[] = [
  { service: "Индивидуальная консультация, очно", price: "от 100 бел.руб." },
  { service: "Индивидуальная консультация, онлайн", price: "от 80 бел.руб." },
  { service: "Парная консультация", price: "от 160 бел.руб." },
];

export type Specialist = {
  name: string;
  initials: string;
  role: string;
  photo: string | null;
};

export const specialists: Specialist[] = [
  {
    name: "Оксана Шульга",
    initials: "ОШ",
    role: "Кандидат психологических наук, директор, гештальт-терапевт, 20+ лет практики",
    photo: "/images/experts/shulga.jpg",
  },
  {
    name: "Елена Рагулина",
    initials: "ЕР",
    role: "Бизнес-тренер, практический психолог, сертифицированный коуч",
    photo: "/images/experts/ragulina.jpg",
  },
  {
    name: "Екатерина Бутрим",
    initials: "ЕБ",
    role: "Медиатор, юрист, кризисный и семейный психолог, 15+ лет практики",
    photo: null,
  },
];
