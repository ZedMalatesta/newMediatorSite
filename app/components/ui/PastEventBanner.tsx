/**
 * Shown once an event's end date has passed (spec §16 rule 2): CTAs are
 * replaced, price tiers hidden, and the page reads as an archive record.
 */
export default function PastEventBanner({ dateLabel }: { dateLabel: string }) {
  return (
    <div
      role="status"
      className="bg-slate-100 border-y border-slate-200 px-4 py-4 text-center"
    >
      <p className="text-slate-700 text-sm font-semibold">
        Прошедшее мероприятие — {dateLabel}
      </p>
      <p className="text-slate-500 text-sm mt-1">
        Регистрация закрыта. Информация ниже сохранена как архив.
      </p>
    </div>
  );
}
