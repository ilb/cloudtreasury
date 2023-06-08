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
      sorter: (a, b) => a.tradingVolume - b.tradingVolume
    }
  ];

  return (
    <>
      <NavMenu selectedMenuItem="calculations"/>
      <Card>
        <ReportTable
          title="Расчёты"
          onChangeParams={params => calculationResource.getCalculationsData(params)}
          onExport={params => window.open(`api/calculations/export?${new URLSearchParams(params).toString()}`)}
          columns={columns}
          withDate={true}
          params={{
            date: moment()
          }}
        />
      </Card>
    </>
  );
}

export const getServerSideProps = handlePage(CalculationUsecases, 'index', 'access:calculations_read');