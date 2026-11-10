import { PiMagnifyingGlassLight, PiXLight } from 'react-icons/pi';

const Search = ({ value, onChange }) => {
  return (
    <div className="group relative w-full lg:w-80">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>

      <PiMagnifyingGlassLight className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60 transition-colors duration-500 ease-spring group-focus-within:text-white" />

      <input
        id="project-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or tech"
        autoComplete="off"
        className="h-12 w-full rounded-full bg-white/[0.04] pl-12 pr-12 text-sm text-white outline-none ring-1 ring-white/10 transition-all duration-500 ease-spring placeholder:text-white/35 hover:ring-white/20 focus:bg-white/[0.06] focus:ring-ember/60 [&::-webkit-search-cancel-button]:hidden"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition-all duration-500 ease-spring hover:bg-white/10 hover:text-white active:scale-95"
        >
          <PiXLight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Search;
