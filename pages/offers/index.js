import React, { useMemo, useState } from 'react'
import NavMenu from '../../client/components/stock/StockNavMenu'
import { Table } from 'antd'
import { handlePage } from '../../src/core/index.mjs';
import CalculationUsecases from '../../src/usecases/CalculationUsecases';


export default function stockValuation({ calculations }) {

  function generateTableData () {
    return calculations.map(item => ({
      id: item.id,
      ticker: item.stock.ticker,
      AssessmentDate: item.AssessmentDate,
      ActiveMarket: item.ActiveMarket,
      FairValue: item.FairValue,
      DaysNumbers: item.DaysNumbers,
      TransactionsNumbers: item.TransactionsNumbers,
      OutputVolume: item.OutputVolume,
      TotalVolume: item.TotalVolume
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
      sorter: true,
    },
    {
      title: 'Наименовние',
      dataIndex: 'ticker',
      sorter: (a, b) => a.ticker.localeCompare(b.ticker)
    },
    {
      title: 'Дата оценки',
      dataIndex: 'AssessmentDate',
      sorter: (a, b) => new Date(b.AssessmentDate) - new Date(a.AssessmentDate)
    },
    {
      title: 'Активный рынок',
      dataIndex: 'ActiveMarket',
      sorter: true,
    },
    {
      title: 'Справедливая стоимость',
      dataIndex: 'FairValue',
      sorter: true,
    },
    {
      title: 'Кол-во дней',
      dataIndex: 'DaysNumbers',
      sorter: true,
    },
    {
      title: 'Кол-во сделок',
      dataIndex: 'TransactionsNumbers',
      sorter: true,
    },
    {
      title: 'Объём выпуска',
      dataIndex: 'OutputVolume',
      sorter: true,
    },
    {
      title: 'Сумарный объём',
      dataIndex: 'TotalVolume',
      sorter: true,
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