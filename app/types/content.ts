/**
 * Content model — spec §8.
 *
 * Every contradiction catalogued in the audit traces to one cause: facts
 * hand-written into page markup, duplicated across pages, then updated in only
 * one copy. These types exist so a person, course or event is described once
 * and rendered everywhere from that single record.
 */

export type PersonRole =
  | "trainer"
  | "specialist"
  | "expert"
  | "speaker"
  | "staff"
  | "guest";

export type Education = {
  period: string;
  institution: string;
  qualification: string;
};

export type Specialisation = {
  field: string;
  title: string;
  hours?: number;
  provider?: string;
  year?: number;
};

export type Experience = { period: string; role: string; organisation: string };

export type PersonContacts = {
  email?: string;
  phone?: string;
  instagram?: string;
  city?: string[];
};

export type Person = {
  slug: string;
  fullName: string;
  /** Prior surnames, so a rename does not read as two different people (Q-11). */
  formerNames?: string[];
  fullLegalName?: string;
  photo?: string;
  shortRole: string;
  longBio?: string;
  education?: Education[];
  specialisations?: Specialisation[];
  experience?: Experience[];
  publications?: { count?: number; notable?: string[] };
  credentials?: string[];
  contacts?: PersonContacts;
  /** [LEGAL] Per-person consent to publish personal contacts (Q-12). */
  publishContacts: boolean;
  roles: PersonRole[];
};

/**
 * The four credentials named across the sites. Which programme grants which is
 * unresolved — spec §8.5 [Q-27], flagged as a blocker. Do not guess a mapping:
 * these are formal qualifications and the terms must be used strictly.
 */
export type DocumentType =
  | "spravka-gos-obrazca"
  | "svidetelstvo-ob-okonchanii"
  | "sertifikat-uchastnika"
  | "svidetelstvo-mediatora";

export type CourseCategory = "programme" | "webinar" | "qualification";
export type CourseFormat = "очно" | "онлайн" | "смешанный" | "дистанционно";
export type EnrolmentStatus = "open" | "closed" | "waitlist";

export type Course = {
  slug: string;
  title: string;
  subtitle?: string;
  category: CourseCategory;
  format: CourseFormat;
  /** ISO date. Enrolment state is derived from this, never hand-set (§16). */
  startDate?: string;
  duration?: string;
  schedule?: string;
  price?: { byn?: number; rub?: number };
  isFree?: boolean;
  documentAwarded?: DocumentType;
  trainers?: string[];
  syllabus?: string[];
  audience?: string[];
  isFeatured?: boolean;
  ministryApproved?: { approved: boolean; reference?: string };
};

export type SessionType =
  | "мастерская"
  | "мастер-класс"
  | "тренинг"
  | "практика"
  | "нетворкинг"
  | "приём пищи"
  | "организационное"
  | "экскурсия"
  | "свободное время";

export type Session = {
  day: string;
  startTime: string;
  endTime: string;
  type: SessionType;
  title: string;
  leaders?: string[];
};

export type PriceTier = {
  label: string;
  windowStart?: string;
  windowEnd?: string;
  byn?: number;
  rub?: number;
};

export type EventStatus = "upcoming" | "open" | "closed" | "past";

export type SiteEvent = {
  slug: string;
  name: string;
  edition?: string;
  courseTitle?: string;
  startDate: string;
  endDate: string;
  venue?: {
    name: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
    travelTime?: string;
    accommodation?: string;
  };
  languages?: string[];
  capacity?: number;
  priceTiers?: PriceTier[];
  packages?: { name: string; includes: string[]; totalFrom?: number }[];
  transfer?: {
    price?: number;
    pickupPoint?: string;
    departureTime?: string;
    returnTime?: string;
    bookingCutoff?: string;
  };
  sessions?: Session[];
  speakers?: string[];
  included?: string[];
  onlineIncluded?: string[];
};

/** §8.6 — statistics carry their verification date so staleness is visible. */
export type Statistic = {
  key: string;
  value: number | string;
  unit?: string;
  /** ISO date this figure was last confirmed with the client. */
  lastVerified?: string;
  source?: string;
};
