'use client';

import { useDeferredValue, useMemo, useState } from 'react';

import ProjectCard from '@/components/cards/Cards';
import FilterType from '@/components/features/FilterType';
import Search from '@/components/features/Search';
import { typeWeb } from '@/utils/static';

// Bento rhythm on a 12-col grid (lg+). Index 0 is the featured tile, 1–2 stack
// beside it, the rest alternate 7/5 ↔ 5/7 so no row reads as a uniform grid.
const getSpan = (index, total) => {
  if (total === 1) return 'lg:col-span-12';
  if (total === 2) return index === 0 ? 'lg:col-span-7' : 'lg:col-span-5';

  if (index === 0) return 'md:col-span-2 lg:col-span-8 lg:row-span-2';
  if (index <= 2) return 'lg:col-span-4';

  const rest = index - 3;
  const isLastAlone = index === total - 1 && (total - 3) % 2 === 1;
  if (isLastAlone) return 'md:col-span-2 lg:col-span-12';

  const pair = Math.floor(rest / 2);
  const first = rest % 2 === 0;
  return pair % 2 === 0 ? (first ? 'lg:col-span-7' : 'lg:col-span-5') : first ? 'lg:col-span-5' : 'lg:col-span-7';
};

const Content = ({ projects }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Keeps typing responsive while the grid re-renders in the background.
  const deferredSearch = useDeferredValue(search);

  const counts = useMemo(() => {
    const result = { All: projects.length };
    projects.forEach((p) => (result[p.type] = (result[p.type] ?? 0) + 1));
    return result;
  }, [projects]);

  const results = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesType = filter === 'All' || project.type === filter;
      const matchesQuery = !query || project.name.toLowerCase().includes(query) || project.stack.some((s) => s.toLowerCase().includes(query));
      return matchesType && matchesQuery;
    });
  }, [projects, filter, deferredSearch]);

  const resetFilters = () => {
    setFilter('All');
    setSearch('');
  };

  return (
    <>
      <div className="mt-14 flex flex-col gap-4 md:mt-20 lg:flex-row lg:items-center lg:justify-between">
        <FilterType options={typeWeb} counts={counts} filter={filter} setFilter={setFilter} />
        <Search value={search} onChange={setSearch} />
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/60" aria-live="polite">
        {results.length} {results.length === 1 ? 'project' : 'projects'}
        {filter !== 'All' && ` · ${filter}`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {results.map((project, index) => (
            <ProjectCard key={project.id} project={project} featured={index === 0 && results.length > 2} priority={index < 3} delay={Math.min(index, 5) * 70} className={getSpan(index, results.length)} />
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/10">
          <div className="flex flex-col items-start gap-5 rounded-[calc(2rem-0.375rem)] bg-[#120909] px-6 py-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] md:px-12">
            <h2 className="text-xl font-bold md:text-2xl">No projects match {deferredSearch ? `“${deferredSearch}”` : 'this filter'}</h2>
            <p className="max-w-md text-sm font-extralight text-white/60">Try a different keyword, such as a tech like “React”, or show every project.</p>
            <button type="button" onClick={resetFilters} className="btn-pill">
              Show all projects
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
