export const navLinks = [
  { label: "About Institution", href: "#about" },
  { label: "Training", href: "#programs" },
  { label: "Services", href: "#services" },
  { label: "Our Projects", href: "#" },
  { label: "Contacts", href: "#footer" },
];

export const promos = [
  "Mediator Training starts June 1 — enroll now",
  "Youth Summer School · July · Grodno",
  "Distance & in-person formats available",
  "State-standard certificates upon completion",
];

export const stats = [
  { value: "7", label: "Expert practitioners" },
  { value: "70%", label: "Practical training" },
  { value: "6", label: "Service directions" },
  { value: "500+", label: "Clients helped" },
];

export const forWhom = [
  {
    icon: "🎓",
    title: "Future Mediators",
    description:
      "Those wanting to become professional mediators and obtain a state-recognised certificate.",
  },
  {
    icon: "📈",
    title: "Specialists in Development",
    description:
      "Psychologists, lawyers, HR professionals seeking advanced training in conflict resolution, negotiations, and mediation.",
  },
  {
    icon: "⚖️",
    title: "Dispute Resolution",
    description:
      "Those resolving family, commercial, civil, or labour disputes through mediation instead of litigation.",
  },
];

export const services = [
  {
    icon: "🎓",
    name: "Mediator Training",
    description: "Ministry of Justice approved professional training programme with a state-standard diploma.",
  },
  {
    icon: "📚",
    name: "Advanced Training & Webinars",
    description: "Continuing education programmes and webinars for practising specialists.",
  },
  {
    icon: "⚖️",
    name: "Mediation Procedure",
    description: "Conducting full mediation sessions for family, commercial, civil, and labour disputes.",
  },
  {
    icon: "🧠",
    name: "Psychological Counselling",
    description: "Individual and group sessions with certified psychologists and gestalt-therapists.",
  },
  {
    icon: "🏢",
    name: "Corporate Training",
    description: "Custom conflict resolution and communication training for organisations and teams.",
  },
  {
    icon: "💼",
    name: "Divorce Services",
    description: "Professional mediation support covering legal and psychological aspects of divorce.",
  },
];

export const advantages = [
  {
    icon: "💡",
    title: "Uniqueness",
    description:
      "Interdisciplinary integration of psychology, philosophy, law, sociology, and economics in every programme.",
  },
  {
    icon: "🔬",
    title: "Relevance",
    description:
      "Modern communication technologies: NLP, transactional analysis, process communication, SPIN, and LAST.",
  },
  {
    icon: "💪",
    title: "Practice First",
    description:
      "70% practical training, 30% theoretical — you gain real skills you can apply from day one.",
  },
  {
    icon: "📜",
    title: "State Certificates",
    description:
      "State-standard certificates and diplomas awarded upon successful completion of programmes.",
  },
  {
    icon: "⭐",
    title: "Quality Guaranteed",
    description:
      "All programmes are delivered by experienced, actively practising specialists.",
  },
  {
    icon: "🤝",
    title: "Personal Support",
    description:
      "Personal accompaniment during training and post-training assistance for every graduate.",
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
    title: "Family Mediation as Family Crisis Resolution Technology",
    startDate: "June 1, 2026",
    format: "online",
    formatLabel: "Online",
    duration: "Short course",
    certificate: "Certificate of completion",
  },
  {
    title: "Mediator Training — Distance Course",
    startDate: "June 1, 2026",
    format: "online",
    formatLabel: "Online",
    duration: "Professional retraining",
    certificate: "State-standard diploma",
  },
  {
    title: "Mediator Training — In-person, Minsk",
    startDate: "June 13, 2026",
    format: "in-person",
    formatLabel: "In-person",
    duration: "Professional retraining",
    certificate: "State-standard diploma",
  },
  {
    title: "Young Mediator School — Territory of Mutual Understanding",
    startDate: "July 2026",
    format: "in-person",
    formatLabel: "In-person · Intensive",
    duration: "10 days · Ages 13–17",
    certificate: "Participation certificate",
  },
  {
    title: "Summer Intensive — Mediator as Personality and Professional",
    startDate: "July 4–6, 2026",
    format: "in-person",
    formatLabel: "In-person · Grodno",
    duration: "3 days · Residential",
    certificate: "Certificate of completion",
  },
  {
    title: "Advanced Conflict Resolution & Negotiations",
    startDate: "September 2026",
    format: "both",
    formatLabel: "Online & In-person",
    duration: "Extended programme",
    certificate: "State-standard diploma",
  },
];

export const categories = [
  "Mediator Training",
  "Advanced Training",
  "Webinars",
  "Free Events",
];

export const disputeTypes = [
  { icon: "📊", label: "Commercial transaction disputes" },
  { icon: "👨‍👩‍👧", label: "Child custody and alimony matters" },
  { icon: "💔", label: "Divorce — legal & psychological aspects" },
  { icon: "👷", label: "Labour disputes" },
  { icon: "🏠", label: "Property division" },
  { icon: "📋", label: "Inheritance disputes" },
];

export const mediationPrinciples = [
  { title: "Voluntariness", description: "All parties participate of their own free will." },
  { title: "Equality", description: "Every participant has equal rights and voice in the process." },
  { title: "Neutrality", description: "The mediator takes no side and imposes no solution." },
  { title: "Confidentiality", description: "Everything said in mediation remains strictly private." },
];

export const mediationAdvantages = [
  "No solutions are imposed — parties decide together",
  "Preserves and develops ongoing relationships",
  "Considers the genuine interests of all parties",
  "Faster and significantly cheaper than litigation",
  "Addresses the emotional dimension of conflicts",
  "Completely confidential — nothing leaves the room",
  "Win-win outcomes that everyone can accept",
  "Develops communication and negotiation skills",
  "Future-oriented — focused on what comes next",
];

export const experts = [
  {
    name: "Oksana Shulga",
    role: "Director",
    credentials: "Mediator · Family & Child Psychologist · Gestalt-therapist · Conflict Specialist",
    initials: "OS",
  },
  {
    name: "Alexey Usenko",
    role: "Mediator & Lecturer",
    credentials: "Conflict Lecturer · Psychologist-Consultant · Coach",
    initials: "AU",
  },
  {
    name: "Marina Boyko",
    role: "Trainer",
    credentials: "PhD in Psychology · Mediator Trainer · Psychologist",
    initials: "MB",
  },
  {
    name: "Arsen Dzhanashia",
    role: "Senior Lecturer",
    credentials: "Senior Lecturer in Psychology · Mogilev State University",
    initials: "AD",
  },
  {
    name: "Alexandra Vartanova",
    role: "Legal Expert",
    credentials: "Senior Lecturer in Civil Law · Grodno State University · Lawyer · Mediator · Trainer",
    initials: "AV",
  },
  {
    name: "Larisa Dankova",
    role: "Mediator & Lawyer",
    credentials: "Lawyer · Civil Society Ombudsman · Mediator · Trainer",
    initials: "LD",
  },
  {
    name: "Alexander Endzheevsky",
    role: "Psychologist & Trainer",
    credentials: "Psychologist · Speaker · Actor · Family Mediator · Trainer",
    initials: "AE",
  },
];

export const telegramBenefits = [
  { icon: "📰", title: "Useful content", description: "Articles, discussions, techniques and real case studies" },
  { icon: "🎟️", title: "Free events", description: "Conferences, open webinars and community meetings" },
  { icon: "📖", title: "Literature", description: "Downloadable books and professional articles" },
  { icon: "🔔", title: "Announcements", description: "Training announcements and exclusive special offers" },
];
