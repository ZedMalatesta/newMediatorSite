export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocumentProps {
  intro?: string;
  sections: LegalSection[];
}
