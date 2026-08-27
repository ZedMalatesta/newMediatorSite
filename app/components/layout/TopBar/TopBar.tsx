export default function TopBar() {
  return (
    <div className="bg-slate-800 border-b border-accent-500/20 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-slate-300">
          <a href="tel:+375298678240" className="hover:text-accent-400 transition-colors">
            +375 (29) 867‑82‑40
          </a>
          <span className="text-slate-600">·</span>
          <a href="tel:+375336899019" className="hidden sm:block hover:text-accent-400 transition-colors">
            +375 (33) 689‑90‑19
          </a>
          <span className="hidden sm:block text-slate-600">·</span>
          <span className="hidden md:block text-slate-400">
            г. Минск, ул. Короля 9, каб. 126
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:mediatorok.by@gmail.com"
            className="text-slate-300 hover:text-accent-400 transition-colors"
          >
            mediatorok.by@gmail.com
          </a>
          <a
            href="#footer"
            className="bg-accent-500 text-white px-3 py-0.5 rounded text-xs font-semibold hover:bg-accent-400 transition-colors"
          >
            Записаться
          </a>
        </div>
      </div>
    </div>
  );
}
