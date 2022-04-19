import { useEffect, useState } from "react";

export const PaginateTool = ({ data, setPage, sortExchange }) => {
  const [dt, setDt] = useState(data);
  useEffect(() => {
    setDt(data);
  }, [data]);
  const nextPage = () => {
    setPage.setVal(dt.page + 1);
    callSocket({ ...dt, page: dt.page + 1 });
  };
  const prevPage = () => {
    setPage.setVal(dt.page - 1);
    callSocket({ ...dt, page: dt.page - 1 });
  };
  const gotoPage = (page) => {
    setPage.setVal(page);
    callSocket({ ...dt, page });
  };

  const callSocket = ($dt) => {
    console.log($dt, "dt");
    sortExchange($dt);
  };

  return (
    <>
      <div className="p-3">
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <span aria-disabled="true" aria-label="&amp;laquo; Previous">
            <button
              onClick={(e) => {
                e.preventDefault();
                prevPage();
              }}
              aria-hidden="true"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span>{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              gotoPage(1);
            }}
            href=""
            aria-label="Go to page 2"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            1
          </a>{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              gotoPage(2);
            }}
            href=""
            aria-label="Go to page 3"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            2
          </a>{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              gotoPage(3);
            }}
            href=""
            aria-label="Go to page 4"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            3
          </a>{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              nextPage();
            }}
            aria-label="Next &amp;raquo;"
            className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </span>
      </div>
    </>
  );
};
