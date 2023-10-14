import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilter,
  updateType,
} from "../../features/slice/chartFilterSlice";
import { fetchChartData } from "../../features/slice/chartSlice";
import { Menu } from "@headlessui/react";

const data = [
  {
    id: 1,
    value: 1,
    text: "1D",
  },
  {
    id: 2,
    value: 3,
    text: "3D",
  },
  {
    id: 3,
    value: 7,
    text: "7D",
  },
  {
    id: 4,
    value: 30,
    text: "1M",
  },
  {
    id: 5,
    value: 365,
    text: "1Y",
  },
];

const ChartFilter = () => {
  const type = useSelector((state) => state.chartFilter.type);
  const filter = useSelector((state) => state.chartFilter.filter);
  const coin = useSelector((state) => state.chart.coin);
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  const dispatch = useDispatch();

  const handleFilter = (item) => {
    dispatch(updateFilter(item.value));
  };

  //On filter change refetch new chart data
  useEffect(() => {
    const { id } = coin;
    dispatch(fetchChartData({ coin: id, baseCurr, filter }));
  }, [filter]);

  return (
    <div className="absolute right-0 top-0 flex gap-2">
      <div className=" relative">
        {/* menu small button change chart design line etc */}

        <Menu>
          <Menu.Button className={"relative"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="h-6 w-6 stroke-accent"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
              />
            </svg>
          </Menu.Button>
          <Menu.Items className="absolute right-0 flex origin-top-right flex-col gap-2 overflow-hidden rounded-md bg-white">
            <Menu.Item>
              <button
                className={`${
                  type === "bar" && "bg-accent text-white"
                } px-4 py-1`}
                onClick={() => dispatch(updateType("bar"))}
              >
                Bar
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className={`${type === "line" && "bg-accent text-white"} py-1`}
                onClick={() => dispatch(updateType("line"))}
              >
                Line
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      {/* show change days week month year etc */}

      {data.map((item) => {
        return (
          <div key={item.id}>
            <button
              className={`${
                filter === item.value
                  ? "bg-accent text-white "
                  : "bg-transparent"
              }  rounded-md px-2 py-1 text-xs dark:text-DarkSecondary`}
              onClick={() => handleFilter(item)}
            >
              {item.text}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ChartFilter;
