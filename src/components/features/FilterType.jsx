const FilterType = ({ options, counts, filter, setFilter }) => {
  return (
    <div role="group" aria-label="Filter projects by type" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
      <div className="inline-flex gap-1 rounded-full bg-white/[0.03] p-1.5 ring-1 ring-white/10">
        {options.map(({ name }) => {
          const active = filter === name;

          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(name)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs transition-all duration-500 ease-spring active:scale-[0.97] md:text-sm ${
                active ? 'bg-[#c8322b] text-white shadow-[0_8px_24px_-8px_rgba(224,65,58,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)]' : 'text-white/55 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {name}
              <span className={`text-[10px] tabular-nums ${active ? 'text-white' : 'text-white/60'}`}>{counts[name] ?? 0}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterType;
