export type Speaker = {
  name: string;
  initials: string;
  role: string;
  photo: string | null;
};

export const speakers: Speaker[] = [
  {
    name: "Оксана Шульга",
    initials: "ОШ",
    role: "Кандидат психологических наук, медиатор, тренер",
    photo: "/images/experts/shulga.jpg",
  },
  {
    name: "Марина Бойко",
    initials: "МБ",
    role: "Основатель Центра модерации, психотерапевт",
    photo: "/images/experts/boyko.jpg",
  },
  {
    name: "Елена Рагулина",
    initials: "ЕР",
    role: "Бизнес-тренер, коуч",
    photo: "/images/experts/ragulina.jpg",
  },
  {
    name: "Марина Богдевич",
    initials: "МБ",
    role: "Финансовый консультант, гештальт-терапевт",
    photo: null,
  },
  {
    name: "Наталья Боричевская",
    initials: "НБ",
    role: "Художник, иконописец",
    photo: null,
  },
  {
    name: "Алексей Усенко",
    initials: "АУ",
    role: "Психолог-конфликтолог, медиатор",
    photo: "/images/experts/usenko.jpg",
  },
];

export type ProgramDay = {
  date: string;
  items: string[];
};

export const program: ProgramDay[] = [
  {
    date: "4 июля",
    items: [
      "Мастерская о расстановках выбора и лидирующих принципах медиатора",
      "Митап о профессиональных мифах",
      "Нетворкинг участников",
    ],
  },
  {
    date: "5 июля",
    items: [
      "Новые техники медиатора",
      "Практики осознанности",
      "Мастерская для медиаторов-блогеров",
      "Мастер-класс по нейрографике",
    ],
  },
  {
    date: "6 июля",
    items: ["Разбор практических кейсов участников", "Подведение итогов школы"],
  },
  {
    date: "7 июля",
    items: ["Завтрак", "На выбор: сплав на байдарках или экскурсия по Гродно"],
  },
];

export const included: string[] = [
  "Сертификат участника",
  "Материалы спикеров",
  "Фото- и видеоотчёт",
  "Подарки",
  "Трёхразовое питание с кофе-паузами",
];
