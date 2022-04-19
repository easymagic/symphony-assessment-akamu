import { useEffect, useState } from "react";
import { useInput, useSocket, useWebSocket } from "../Hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ExchangeToolBar = () => {
  const [currency_from, setCurrencyFrom] = useInput("BTC");
  const [amount1, setAmount1] = useInput("");
  const [currency_to, setCurrencyTo] = useInput("USD");
  const [amount2, setAmount2] = useInput("");

  const {
    saveExchange: saveExchangeOther,
    exchanges,
    fetchLiveExchange,
  } = useWebSocket();

  const clearInput = () => {
    setCurrencyFrom.setVal("");
    setAmount1.setVal("");
    setCurrencyTo.setVal("");
    setAmount2.setVal("");
  };

  const saveExchange = () => {
    console.log({
      currency_from: currency_from().value,
      amount1: amount1().value,
      currency_to: currency_to().value,
      amount2: amount2().value,
    });
    saveExchangeOther({
      currency_from: currency_from().value,
      amount1: amount1().value,
      currency_to: currency_to().value,
      amount2: amount2().value,
    });

    toast("Exchange saved successfully.");
    clearInput();
  };

  const computeRate = (currencyFrom, amount) => {
    let found = exchanges.filter((item) => {
      return item.currency_from == currencyFrom;
    });
    if (found.length) {
      return found[0].amount1 * amount;
    }
    return 0;
  };

  const IncludeCryptoExcept = ({ excludes = [] }) => {
    return exchanges
      .filter((item) => {
        return !excludes.includes(item.currency_from);
      })
      .map((item, key) => {
        return (
          <option key={key} value={item.currency_from}>
            {item.currency_from}
          </option>
        );
      });
  };

  useEffect(() => {
    setAmount2.setVal(computeRate(currency_from().value, amount1().value));
  }, [currency_from().value, amount1().value, currency_to().value]);

  useEffect(() => {
    fetchLiveExchange();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="p-2">
        <b>Exchange</b>
      </div>
      <div className="flex flex-row mt-3">
        <div className="p-2">
          <div className="text-slate-500">Currency From</div>
          <div>
            <select
              {...currency_from()}
              className="px-4 py-2 border-2 rounded w-full"
            >
              <option value="">--Select--</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>

              <IncludeCryptoExcept excludes={["BTC", "ETH"]} />
            </select>
          </div>
        </div>

        {/* amount */}
        <div className="p-2">
          <div className="text-slate-500">Amount</div>
          <div>
            <input
              {...amount1()}
              className="px-4 py-2 border-2 rounded w-full"
            />
          </div>
        </div>

        <div className="p-2">
          <div className="mt-7">=</div>
        </div>

        <div className="p-2">
          <div className="text-slate-500">Currency To</div>
          <div>
            <select
              {...currency_to()}
              className="px-4 py-2 border-2 rounded w-full"
            >
              <option value="">--Select--</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* amount */}
        <div className="p-2">
          <div className="text-slate-500">Amount</div>
          <div>
            <input
              readOnly={true}
              {...amount2()}
              className="px-4 py-2 border-2 rounded w-full"
            />
          </div>
        </div>

        <div>
          <button
            onClick={saveExchange}
            className="ml-1 px-4 py-2 bg-green-600 rounded text-white mt-8"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
