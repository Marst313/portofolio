'use client';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useMemo, useState } from 'react';
import debouce from 'lodash.debounce';

import { typeWeb } from '@/utils/static';
import Cards from '@/components/cards/Cards';
import { getData } from '@/utils/fetch';

const Project = () => {
  const [immutableData, setImmutableData] = useState([]);

  const [filter, setFilter] = useState('All');
  const [data, setData] = useState([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [search, setSearch] = useState('');

  const handleOnClick = (value) => {
    setFilter(value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 2000);
  }, []);

  // ! Filter
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
    <section className="flex flex-col items-center justify-center gap-2 py-0 m-0">
      <h1 className="text-white xl:text-6xl mt-0 ">Projects</h1>

      {/* Search */}
      <div className="relative mt-1 group ">
        <input type="text" placeholder="Search" onChange={handleSearch} className="bg-white/20 placeholder:text-white outline-none p-2 lg:px-5 rounded-md  w-full xl:w-96 shadow-black " />
        <IoSearch className="absolute right-3 top-3 lg:right-3 lg:top-1 lg:w-7 lg:h-7" />
      </div>

      {/* Type */}

      <ul className="bg-white/20 px-5 py-1 lg:mt-3 shadow-black rounded-md flex items-center justify-center lg:gap-5 z-50 w-fit overflow-auto">
        {typeWeb.map((type) => {
          return (
            <li key={type.name} className={`${filter === type.name ? 'bg-[#3D0000] rounded-md shadow-black' : ''}  transition-all px-2 text-xs lg:text-base lg:px-10 py-1 `}>
              <button type="button" onClick={() => handleOnClick(type.name)}>
                {type.name}
              </button>
            </li>
          );
        })}
      </ul>

      <h1 className="text-base lg:text-2xl">{data?.length} Results</h1>

      {/* Cards */}

      {data.length <= 0 ? (
        <section>
          <h1>Loading...</h1>
        </section>
      ) : (
        <Cards data={data} currentProject={currentProject} setCurrentProject={setCurrentProject} />
      )}

      <div></div>
    </section>
  );
};

export default Project;
