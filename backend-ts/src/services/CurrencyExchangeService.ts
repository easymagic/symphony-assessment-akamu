import { Op, where } from "sequelize";
import db from "../models";
import $currencyexchange from "../models/currencyexchange";

const CurrencyExchange = $currencyexchange(
  db.sequelize,
  db.Sequelize.DataTypes
);

export const TYPE_LIVE_PRICE = "Live Price";
export const TYPE_SAVED_EXCHANGE = "Exchanged";
export const DEFAULT_CURRENCY_TO = "USD";
export const TYPE_ALL = "All";
const PAGE_SIZE = 5;

export interface CurrencyExchangeSchema {
  date_and_time?: string;
  currency_from: string;
  amount1: string;
  currency_to: string;
  amount2: string;
  type: string;
  id?: number;
}

export default class CurrencyExchangeService {
  static async fetch(
    type: string = TYPE_ALL,
    dateFrom: string = "",
    dateTo: string = "",
    page: number = 0,
    usePaginate: boolean = false
  ): Promise<any> {
    let filter: any = {};
    // filter.where.type = type;
    if (type != TYPE_ALL) {
      filter.where = {
        type,
      };
    }
    filter.order = [];
    filter.order.push(['id','DESC']);
    if (dateFrom && dateTo) {
      filter.where = filter.where || {};
      filter.where.createdAt = {
        [Op.gte]: dateFrom,
        [Op.lte]: dateTo,
      };
    }
    if (usePaginate){
      return await CurrencyExchange.findAll(
        this.paginate(filter, { page, pageSize: PAGE_SIZE })
      );
    }
    return await CurrencyExchange.findAll(filter);
  }

  static paginate(query: {}, { page, pageSize }: any) {
    const offset = page * pageSize;
    const limit = pageSize;
    return {
      ...query,
      offset,
      limit,
    };
  }

  static async sortAndFilter(
    dateFilter: string = "",
    sortField: string = "",
    sortOrder: string = "DESC"
  ) {
    let filters: any = {
      where: {},
      order: [],
    };
    filters["where"].type = TYPE_SAVED_EXCHANGE; //restrict filters to only saved exchanges
    if (dateFilter) {
      filters["where"].createdAt = {
        [Op.gte]: dateFilter,
      };
    }
    if (sortField) {
      filters["order"].push([sortField, sortOrder]);
    }
    console.log(filters, "filters");
    return await CurrencyExchange.findAll(filters);
  }

  static async create(data: any) {
    let $date = new Date();
    data.date_and_time =
      $date.toLocaleDateString() + " " + $date.toLocaleTimeString();
    return await CurrencyExchange.create(data);
  }

  static async cryptoExists(crypto: string) {
    let count = await CurrencyExchange.count({
      where: {
        currency_from: crypto,
      },
    });
    return Promise.resolve(count > 0);
  }

  static async countAll(type: string = TYPE_LIVE_PRICE) {
    return await CurrencyExchange.count({
      where: {
        type: type,
      },
    });
  }

  static async update(id: number, data: {}) {
    await CurrencyExchange.update(data, {
      where: {
        id: id,
      },
    });
  }

  static async createIfNotExists(data: CurrencyExchangeSchema) {
    let check = await this.cryptoExists(data.currency_from);
    if (!check) {
      await this.create(data);
    }
    return Promise.resolve("created");
  }

  static async getEstimatedConversion(
    currencyFrom: string,
    currencyTo: string,
    amount1: string
  ) {
    let record: any = await CurrencyExchange.findOne({
      where: {
        currency_from: currencyFrom,
        type: TYPE_LIVE_PRICE,
        currency_to: DEFAULT_CURRENCY_TO,
      },
    });
    if (record) {
      return Promise.resolve(+amount1 * record.amount1);
    }
    return Promise.resolve(0);
  }
}
