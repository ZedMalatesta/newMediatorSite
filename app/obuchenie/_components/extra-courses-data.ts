export type ExtraCourse = {
  title: string;
  description: string;
  /** The course's own page. */
  href: string;
};

export const extraCourses: ExtraCourse[] = [
  {
    title: "Точка роста. Перезагрузка",
    description: "Финансовый курс для специалистов помогающих профессий.",
    href: "/tochkarosta",
  },
  {
    title: "Психологическое консультирование",
    description: "Базовый онлайн-курс по основам психологического консультирования.",
    href: "/consultation",
  },
  {
    title: "Английский для психологов",
    description: "Онлайн-курс профессионального английского языка.",
    href: "/englishforpsychology",
  },
  {
    title: "Английский для медиации и переговоров",
    description: "Онлайн-курс профессионального английского языка.",
    href: "/englishformediation",
  },
  {
    title: "Новые технологии современной медиации",
    description: "Программа повышения квалификации для практикующих медиаторов.",
    href: "/newtechnologies",
  },
];
