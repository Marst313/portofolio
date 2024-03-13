import { IoSearch } from 'react-icons/io5';

const Search = ({ debouncedResults }) => {
  return (
    <div className="relative mt-1 group ">
      <input type="text" placeholder="Search" onChange={debouncedResults} className="bg-white/20 placeholder:text-white outline-none p-2 lg:px-5 rounded-md  w-full xl:w-96 shadow-black " />
      <IoSearch className="absolute right-3 top-3 lg:right-3 lg:top-1 lg:w-7 lg:h-7" />
    </div>
  );
};

export default Search;
