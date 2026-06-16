export type NavLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Service = {
  name: string;
  description: string;
  iconSrc: string;
};

export type NewsItem = {
  text: string;
};

export type Advantage = {
  title: string;
  description: string;
  iconSrc: string;
};

export type ProgramFormat = "in-person" | "online" | "both";

export type Program = {
  title: string;
  startDate: string;
  duration: string;
  certificate: string;
  format: ProgramFormat;
};

export type DisputeType = {
  label: string;
  iconSrc: string;
};

export type MediationPrinciple = {
  title: string;
  description: string;
};

export type Expert = {
  name: string;
  initials: string;
  role: string;
  credentials: string;
  photoSrc: string | null;
};

export type TelegramBenefit = {
  icon: string;
  title: string;
  description: string;
};
