/**
 * Emits a JSON-LD block. Spec §12: structured data was absent from both sites;
 * the course and event pages are natural rich-result candidates.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored here, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
