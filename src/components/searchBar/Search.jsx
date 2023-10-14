import { useState } from "react";
import BaseCurrency from "./BaseCurrency";
import SearchResult from "./SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { fetchBestMatches } from "../../features/slice/searchSlice";
import { useRef } from "react";
const Search = () => {
  const inputRef = useRef();
  const timeout = useRef();

  const [isOpen, setisOpen] = useState(false);
  const bestMatches = useSelector((state) => state.search.bestMatches);
  const dispatch = useDispatch();

  const handleDebounceSearch = () => {
    clearTimeout(timeout.current);
    if (inputRef?.current?.value?.length < 4) {
      return null;
    }
    timeout.current = setTimeout(() => {
      dispatch(fetchBestMatches(inputRef?.current.value));
      setisOpen(true);
    }, 1000);
  };

  const clearInput = () => {
    setisOpen(false);
    if (inputRef?.current) {
      inputRef.current.value = null;
    }
  };

  return (
    <div className=" relative flex w-full max-w-[600px] rounded-[50px] bg-light  px-4  py-2 shadow-shadow1 dark:bg-dark dark:shadow-none">
      <BaseCurrency />
      <input
        ref={inputRef}
        type="text"
        name="input"
        id="input"
        className="w-full bg-transparent px-4 py-2 text-lightPrimary placeholder:text-lightSecondary focus:outline-none dark:text-DarkPrimary placeholder:dark:text-DarkSecondary "
        placeholder="Search Crypto  "
        onChange={handleDebounceSearch}
      />

      {inputRef?.current?.value?.length > 0 && (
        <button className="pr-2" onClick={clearInput} title="Clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            className="h-6 w-6 stroke-accent"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          className="h-6 w-6 stroke-accent/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
      <div>
        {isOpen && <SearchResult clearInput={clearInput} data={bestMatches} />}
      </div>

    </div>
  );
};

export default Search;
