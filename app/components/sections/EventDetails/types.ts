export interface EventBulletGroup {
  heading: string;
  items: string[];
}

export interface EventSpeaker {
  name: string;
  role: string;
  photo: string | null;
  initials: string;
}

export interface EventDetailsProps {
  description?: string[];
  groups?: EventBulletGroup[];
  speaker?: EventSpeaker;
}
