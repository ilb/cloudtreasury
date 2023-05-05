import React, { useMemo, useState } from 'react'
import NavMenu from '../../client/components/stock/StockNavMenu'
import { Table } from 'antd'
import { handlePage } from '../../src/core/index.mjs';
import CalculationUsecases from '../../src/usecases/CalculationUsecases';


export default function Offer({ calculations }) {


  function generateTableData () {
    return calculations.map(item => ({
      id: item.id,
      ticker: item.ticker,
      date: item.date,

      active: item.data.active === 'ACTIVE' ? 'Да' : 'Нет',
      fairPrice: item.data.fairPrice,
      countDays: item.data.countDays,
      countDeals: item.data.countDeals,
      initialVolume: item.data.initialVolume,
      tradingVolume: item.data.tradingVolume, 
    }))
  }

  const [tableData, setTableDate] = useState()
  useMemo(() => {
    setTableDate(generateTableData())
  }, [calculations])

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Наименовние',
      dataIndex: 'ticker',
      sorter: (a, b) => a.ticker.localeCompare(b.ticker),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'Активный рынок',
      dataIndex: 'active',
    },
    {
      title: 'Справедливая стоимость',
      dataIndex: 'fairPrice',
      sorter: (a, b) => a.fairPrice - b.fairPrice,
    },
    {
      title: 'Кол-во дней',
      dataIndex: 'countDays',
      sorter: (a, b) => a.countDays - b.countDays,
    },
    {
      title: 'Кол-во сделок',
      dataIndex: 'countDeals',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Объём выпуска',
      dataIndex: 'initialVolume',
      sorter: (a, b) => a.initialVolume - b.initialVolume,
    },
    {
      title: 'Сумарный объём',
      dataIndex: 'tradingVolume',
      sorter: (a, b) => a.tradingVolume - b.tradingVolume,
    },

  ];



  return (
    <>
      <NavMenu selectedMenuItem={'offers'} />
      <Table
          // onRow={(record) => ({
          //   onClick: async () => await router.push(`users/${record.id}`)
          // })}
          columns={columns}
          dataSource={tableData}
          // pagination={params.pagination}
          // onChange={handleTableChange}
        />
      
    </>

  )
}

export const getServerSideProps = handlePage(CalculationUsecases, 'index', 'access:offers_read');