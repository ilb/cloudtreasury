import React, { useContext } from 'react';
import NavMenu from '../../client/components/stock/StockNavMenu';
import { Card } from 'antd';
import { handlePage } from '../../src/core/index.mjs';
import CalculationUsecases from '../../src/usecases/CalculationUsecases.mjs';
import { AwilixContext } from '../_app';
import moment from 'moment/moment';
import ReportTable from '../../client/components/core/ReportTable';

export default function Offer() {
  const {
    /** @type {CalculationResource} */ calculationResource
  } = useContext(AwilixContext);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Наименовние',
      dataIndex: 'ticker',
      sorter: (a, b) => a.ticker.localeCompare(b.ticker)
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date)
    },
    {
      title: 'Активный рынок',
      dataIndex: 'active',
      render: (active) => active === 'ACTIVE' ? 'Да' : 'Нет'
    },
    {
      title: 'Справедливая стоимость',
      dataIndex: 'fairPrice',
      sorter: (a, b) => a.fairPrice - b.fairPrice
    },
    {
      title: 'Кол-во дней',
      dataIndex: 'countDays',
      sorter: (a, b) => a.countDays - b.countDays
    },
    {
      title: 'Кол-во сделок',
      dataIndex: 'countDeals',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Объём выпуска',
      dataIndex: 'initialVolume',
      sorter: (a, b) => a.initialVolume - b.initialVolume
    },
    {
      title: 'Сумарный объём',
      dataIndex: 'tradingVolume',
      getCalculationsData(params) {
        // Some code here...
        export default class CalculationUsecases {
          // Some code here...
        
          filterStocks(stocks) {
            return stocks.filter(stock => stock.endDate === null);
          }
        }

export const getServerSideProps = async (context) => {
  const props = await handlePage(CalculationUsecases, 'index', 'access:calculations_read')(context);
  return { props };
};