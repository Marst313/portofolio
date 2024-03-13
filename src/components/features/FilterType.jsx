import { typeWeb } from '@/utils/static';

const FilterType = ({ filter, setFilter }) => {
  const handleOnClick = (value) => {
    setFilter(value);
  };

  return (
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
  );
};

export default FilterType;
