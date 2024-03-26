'use client';

import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import Cards from '@/components/cards/Cards';
import FilterType from '@/components/features/FilterType';
import Search from '@/components/features/Search';
import { getData } from '@/utils/fetch';

const Content = () => {
  const [immutableData, setImmutableData] = useState([]);

  const [filter, setFilter] = useState('All');
  const [data, setData] = useState([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log('contoh');
  };

  // ! Debounce
  const debouncedResults = useMemo(() => {
    return debounce(handleSearch, 1000);
  }, []);

  // ! Features
  useEffect(() => {
    const results = immutableData // ! Filter
      .filter((item) => (filter === 'All' ? immutableData : item.fields.type === filter)) // ! Search
      .filter((item) => item.fields.name.toLowerCase().includes(search.toLowerCase()));

    setCurrentProject(0);
    setData(results);

    return () => {
      debouncedResults.cancel();
    };
  }, [filter, search]);

  // ! Initial Fetching Data
  useEffect(() => {
    getData(setData, setImmutableData);
  }, []);

  return (
    <>
      {/* Search */}
      <Search debouncedResults={debouncedResults} />

      {/* Type */}
      <FilterType filter={filter} setFilter={setFilter} />

      <h1 className="text-base lg:text-2xl">{data?.length} Results</h1>

      {/* Cards */}
      {data.length <= 0 ? (
        <section>
          <h1>Loading...</h1>
        </section>
      ) : (
        <Cards data={data} currentProject={currentProject} setCurrentProject={setCurrentProject} />
      )}
    </>
  );
};

export default Content;
