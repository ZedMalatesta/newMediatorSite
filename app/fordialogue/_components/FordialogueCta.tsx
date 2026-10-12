import { getPageBlocks } from "@lib/pageBlocks";

/**
 * The live page closes with two invitations - to experts and to parties in a
 * dispute - and the initiative's contacts. The invitations are read from the
 * synced page; the contact line names the people and organisation behind the
 * initiative without their personal phone numbers, which are published only
 * with each person's consent.
 */
export default function FordialogueCta() {
  const invitations = getPageBlocks("fordialogue")
    .flatMap((b) => b.cards)
    .filter((c) => !c.title && /^Как /.test(c.body[0]?.text ?? ""))
    .map((c) => {
      const [who, ...rest] = c.body[0].text.split(" - ");
      return { who, call: rest.join(" - ").replace(/\s+!$/, "!") };
    });

  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Присоединяйтесь
          </p>
          <h2 className="text-3xl font-bold mb-2">Кто вы в этом диалоге?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {invitations.map((c) => (
            <div key={c.who} className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20 text-center flex flex-col">
              <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">{c.who}</p>
              <h3 className="text-xl font-bold mb-6 flex-1">{c.call}</h3>
              <a
                href="mailto:mediatorok.by@gmail.com"
                className="inline-block self-center bg-accent-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-accent-400 transition-colors text-sm"
              >
                Написать нам
              </a>
            </div>
          ))}
        </div>

        <div className="text-slate-400 text-sm text-center space-y-1">
          <p className="text-slate-200 font-semibold">Наши контакты</p>
          <p>Алексей Усенко (Беларусь)</p>
          <p>
            Восточноевропейская Ассоциация гражданского образования (Eastern European Association for Civic
            Education) —{" "}
            <a href="mailto:eenceboard@gmail.com" className="text-accent-400 hover:underline">
              eenceboard@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
