export const services = [
  { name: "Conflict Resolution", icon: "⚖️" },
  { name: "Mediation", icon: "🤝" },
  { name: "Team Building", icon: "👥" },
  { name: "Leadership Training", icon: "📈" },
  { name: "Communication Skills", icon: "💬" },
  { name: "Stress Management", icon: "🧘" },
  { name: "Crisis Management", icon: "🚨" },
  { name: "Professional Development", icon: "📚" },
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
    title: "Professional Mediation Training",
    startDate: "August 24, 2026",
    format: "in-person",
    formatLabel: "In-person",
    duration: "1 session · 1080 hours",
    certificate: "Diploma with work rights",
  },
  {
    title: "Advanced Conflict Resolution",
    startDate: "October 5, 2026",
    format: "both",
    formatLabel: "Online & In-person",
    duration: "3 sessions · 1080 hours",
    certificate: "Diploma with work rights",
  },
  {
    title: "Specialized Mediation Services",
    startDate: "October 12, 2026",
    format: "online",
    formatLabel: "Online",
    duration: "1 session · 477 hours",
    certificate: "Diploma with work rights",
  },
  {
    title: "Professional Development Program",
    startDate: "October 19, 2026",
    format: "online",
    formatLabel: "Online",
    duration: "1 session · 980 hours",
    certificate: "Diploma with work rights",
  },
  {
    title: "Negotiation & Facilitation",
    startDate: "November 3, 2026",
    format: "in-person",
    formatLabel: "In-person",
    duration: "2 sessions · 720 hours",
    certificate: "Certificate of completion",
  },
  {
    title: "Workplace Conflict Coaching",
    startDate: "November 17, 2026",
    format: "both",
    formatLabel: "Online & In-person",
    duration: "1 session · 360 hours",
    certificate: "Certificate of completion",
  },
];

export const categories = [
  "Short-term Programs",
  "Extended Programs",
  "Professional Certification",
  "Free Events",
];

export const promos = [
  "−10% on June–August programs",
  "−15% on your first course",
  "−3% for early payment (7 days before)",
  "Installment plans available",
];

export const stats = [
  { value: "2010", label: "Year founded" },
  { value: "1,200+", label: "Programs per year" },
  { value: "800+", label: "Online programs" },
  { value: "4.9 ★", label: "Average rating" },
];

export const navLinks = [
  { label: "About", href: "#" },
  { label: "Directions", href: "#directions" },
  { label: "Programs", href: "#programs" },
  { label: "Free Events", href: "#" },
  { label: "Contacts", href: "#footer" },
];
