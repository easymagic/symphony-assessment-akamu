export const ExchangeTableFilter = ({
  type,
  dateFrom,
  dateTo,
  page,
  setPage,
}) => {
  return (
    <>
      <div className="p-2 mt-3">
        <b>History</b>
      </div>
      <div className="flex flex-row mt-3">
        {/*  */}
        <div className="p-2">
          <div className="text-slate-500">From Date</div>
          <div>
            <input
              {...dateFrom()}
              type="date"
              className="px-4 py-2 border-2 rounded w-full"
            />
          </div>
        </div>

        {/*  */}
        <div className="p-2">
          <div className="text-slate-500">To Date</div>
          <div>
            <input
              {...dateTo()}
              type="date"
              className="px-4 py-2 border-2 rounded w-full"
            />
          </div>
        </div>

        <div className="p-2">
          <div className="text-slate-500">Type</div>
          <div>
            <select {...type()} className="px-4 py-2 border-2 rounded w-full">
              <option value="All">All</option>
              <option value="Exchanged">Exchanged</option>
              <option value="Live Price">Live Price</option>
            </select>
          </div>
        </div>

        <div>
          <button
            onClick={() => setPage.setVal(0)}
            className="ml-1 px-4 py-2 border-2 rounded text-cyan-700 border-cyan-900 mt-8"
          >
            Filter
          </button>
        </div>
      </div>
    </>
  );
};
