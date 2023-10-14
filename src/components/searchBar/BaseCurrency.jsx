import { useDispatch } from "react-redux";
import { updateBaseCurrency } from "../../features/slice/searchSlice";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useEffect } from "react";

const currencies = [
  {
    value: "usd",
    name: "USD",
  },
  {
    value: "inr",
    name: "INR",
  },
  {
    value: "eur",
    name: "EUR",
  },
];

const BaseCurrency = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(currencies[0]);

  //On base currency change update the store and refetch the market data with new currencyes
  useEffect(() => {
    dispatch(updateBaseCurrency(selected.value));
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-pointer cursor-default rounded-lg bg-light py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-dark sm:text-sm">
          <span className="block truncate text-lightPrimary dark:text-DarkPrimary">
            {selected.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              className="h-4 w-4 stroke-accent"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-light py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none dark:bg-dark sm:text-sm">
            {currencies.map((currency, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative  w-full cursor-default select-none py-1 hover:cursor-pointer ${
                    active
                      ? "bg-light text-accent dark:bg-dark"
                      : "text-lightSecondary dark:text-DarkSecondary"
                  }`
                }
                value={currency}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block w-full truncate py-2 text-center ${
                        selected
                          ? "bg-accent font-medium text-white"
                          : "font-normal"
                      }`}
                    >
                      {currency.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default BaseCurrency;
