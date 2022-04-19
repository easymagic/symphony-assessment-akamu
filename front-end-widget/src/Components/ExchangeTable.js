import { useEffect } from "react";
import { useTableFilter } from "../Hooks";
import { ExchangeTableFilter } from "./ExchangeTableFilter";
import { PaginateTool } from "./PaginateTool";

export const ExchangeTable = () => {
  const {
    data,
    type,
    dateFrom,
    dateTo,
    page,
    setPage,
    exchangeList,
    fetchAllExchange,
    sortExchange,
  } = useTableFilter();

  useEffect(() => {
    fetchAllExchange();
  }, []);

  // console.log(exchangeList, "exchange-list.");

  return (
    <>
      <ExchangeTableFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        page={page}
        setPage={setPage}
        type={type}
      />

      <div className="relative overflow-x-auto p-2">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date Time
              </th>
              <th scope="col" className="px-6 py-3">
                Currency From
              </th>
              <th scope="col" className="px-6 py-3">
                Amount 1
              </th>
              <th scope="col" className="px-6 py-3">
                Currency To
              </th>
              <th scope="col" className="px-6 py-3">
                Amount 2
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {exchangeList.map((item, key) => (
              <>
                <tr key={key} className="bg-white border-b ">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium  text-gray-900"
                  >
                    {item.createdAt}
                  </td>
                  <td className="px-6 py-4">{item.currency_from}</td>
                  <td className="px-6 py-4">{item.amount1}</td>
                  <td className="px-6 py-4">{item.currency_to}</td>
                  <td className="px-6 py-4">
                    {item.amount2 ? item.amount2 : "#######"}
                  </td>
                  <td className="px-6 py-4">{item.type}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <PaginateTool
          data={data()}
          setPage={setPage}
          sortExchange={sortExchange}
        />
      </div>
    </>
  );
};
