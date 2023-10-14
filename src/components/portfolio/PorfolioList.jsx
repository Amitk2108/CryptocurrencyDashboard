
const PorfolioList = ({ portfolio }) => {
  //
  return (
    <div className=" flex items-center justify-center ">
      <ul className=" custom-scroll grid h-full max-h-[150px]  gap-2 overflow-y-scroll py-2 px-4">
        {portfolio?.map((coin, index) => {
          return (
            <li className=" flex items-center gap-1" key={index}>
              <span className="text-sm font-normal text-dark">
                {coin.name}:
              </span>
              <span className="text-sm  font-semibold text-dark">
                {coin.amount.toFixed(3)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PorfolioList;
