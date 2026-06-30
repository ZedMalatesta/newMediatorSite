const details = [
  {
    label: "Формат",
    value: "Офлайн, Минск",
  },
  {
    label: "Расписание",
    value: "Пн–пт, начало в 11:00, 3 часа с перерывом",
  },
  {
    label: "Стоимость занятия",
    value: "45 бел. руб.",
  },
  {
    label: "Полный курс",
    value: "450 бел. руб.",
  },
];

export default function SchoolDetails() {
  return (
    <section className="bg-amber-500 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {details.map((d) => (
          <div key={d.label}>
            <p className="text-amber-100 text-xs font-semibold uppercase tracking-wider mb-0.5">
              {d.label}
            </p>
            <p className="text-white font-semibold text-sm leading-snug">{d.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
