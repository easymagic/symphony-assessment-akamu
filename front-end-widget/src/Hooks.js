import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_PORT = 5000;

export const useSocket = () => {
  const socket = io(`ws://127.0.0.1:${SOCKET_PORT}`);

  const socketCallback = (cb) => {
    console.log(socket, "null-socket.......");
    if (socket !== null) {
      console.log(socket, "socket...");
      cb(socket);
    }
  };

  return { socket, socketCallback };
};

export const useWebSocket = () => {
  const ref = useRef();

  const [exchanges, setExchanges] = useState([]);
  const [exchangeList, setExchangeList] = useState([]);

  const saveExchange = (data) => {
    ref.current.emit("save-exchange", data);
  };
  const sortExchange = (data) => {
    ref.current.emit("sort", data);
    console.log("Triggered sort", data);
  };
  const fetchLiveExchange = () => {
    ref.current.emit("get-live-exchange");
  };
  const fetchAllExchange = () => {
    ref.current.emit("trigger-fetch");
  };

  useEffect(() => {
    const socket = io(`ws://127.0.0.1:${SOCKET_PORT}`);

    socket.on("fetch-live-exchange", (records) => {
      console.log(records);
      setExchanges(records);
    });

    socket.on("fetch", (records) => {
      console.log(records, "rcd");
      setExchangeList(records);
    });

    ref.current = socket;
    return () => socket.disconnect();
  }, []);

  return {
    exchanges,
    exchangeList,
    saveExchange,
    sortExchange,
    fetchLiveExchange,
    fetchAllExchange,
  };
};

export const useInput = (value) => {
  const [val, setVal] = useState(value);
  const bind = () => {
    return {
      value: val,
      onChange: (e) => {
        setVal(e.target.value);
      },
    };
  };
  return [bind, { val, setVal }];
};

export const useTableFilter = () => {
  const [type] = useInput("");
  const [dateFrom] = useInput("");
  const [dateTo] = useInput("");
  const [page, setPage] = useInput(0);

  const { exchangeList, fetchAllExchange, sortExchange } = useWebSocket();

  const applyFilter = ({ type, dateFrom, dateTo, page }) => {
    // console.log({ type, dateFrom, dateTo, page });
    sortExchange({ type, dateFrom, dateTo, page });
  };

  let lvalue = type().value,
    ldateFrom = dateFrom().value,
    ldateto = dateTo().value;
  let data = () => ({
    type: type().value,
    dateFrom: dateFrom().value,
    dateTo: dateTo().value,
    page: page().value,
  });

  useEffect(() => {
    applyFilter(data());
  }, [lvalue, ldateFrom, ldateto]);

  return {
    type,
    dateFrom,
    dateTo,
    page,
    setPage,
    data,
    exchangeList,
    fetchAllExchange,
    sortExchange,
  };
};
