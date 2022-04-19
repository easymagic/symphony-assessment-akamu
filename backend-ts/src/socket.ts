import { Application } from "express";
import http from "http";
import { PORT_SOCKET_CLIENT } from "./app";
import CurrencyExchangeService, {
  CurrencyExchangeSchema,
  TYPE_ALL,
  TYPE_LIVE_PRICE,
  TYPE_SAVED_EXCHANGE,
} from "./services/CurrencyExchangeService";

export const Socket = (app: Application) => {
  const server = http.createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: `http://localhost:${PORT_SOCKET_CLIENT}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: any) => {
    console.log("Client just got connected...");
    socket.on("message", () => {});
    socket.on("get-live-exchange", async () => {
      let records = await CurrencyExchangeService.fetch(
        TYPE_LIVE_PRICE,
        "",
        "",
        0
      );
      io.emit("fetch-live-exchange", records);
    });
    socket.on("trigger-fetch", async () => {
      let records = await CurrencyExchangeService.fetch(
        TYPE_ALL,
        "",
        "",
        0,
        true
      );
      io.emit("fetch", records);
    });
    socket.on("save-exchange", async (data: CurrencyExchangeSchema) => {
      console.log(data);
      await CurrencyExchangeService.create({
        currency_from: data.currency_from,
        amount1: data.amount1,
        currency_to: data.currency_to,
        amount2: await CurrencyExchangeService.getEstimatedConversion(
          data.currency_from,
          data.currency_to,
          data.amount1
        ),
        type: TYPE_SAVED_EXCHANGE,
      });
      let records = await CurrencyExchangeService.fetch(
        TYPE_ALL,
        "",
        "",
        0,
        true
      );
      io.emit("fetch", records);
    });

    socket.on("sort", async (filters: any) => {
      filters.type = filters.type || TYPE_ALL;
      filters.dateFrom = filters.dateFrom || "";
      filters.dateTo = filters.dateTo || "";
      filters.page = filters.page || 0;
      let records = await CurrencyExchangeService.fetch(
        filters.type,
        filters.dateFrom,
        filters.dateTo,
        filters.page,
        true
      );
      io.emit("fetch", records);
      console.log('fetched',records.length,new Date);
    });
  });
  return { server, io };
};
