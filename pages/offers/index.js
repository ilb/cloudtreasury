import React, { useMemo, useState } from 'react'
import NavMenu from '../../client/components/stock/StockNavMenu'
import { Card, Table, Typography } from 'antd'
import { handlePage } from '../../src/core/index.mjs';
import CalculationUsecases from '../../src/usecases/CalculationUsecases.mjs';
const { Title } = Typography;


export default function Offer({ calculations }) {


  function generateTableData () {
    return calculations.map(item => ({
      id: item.id,
      ticker: item.ticker,
      date: item.date,

      ...item.data
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
      render: (active) => active === 'ACTIVE' ? 'Да' : 'Нет' 
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
      <Card title='' className='py16'>
        <Title level={4}>
            <span>Расчёты</span>
        </Title>
        <Table columns={columns} dataSource={tableData} />
      </Card>
    </>

  )
}

export const getServerSideProps = handlePage(CalculationUsecases, 'index', 'access:offers_read');