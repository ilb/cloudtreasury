import React from 'react'
import NavMenu from '../../client/components/stock/StockNavMenu'
import { Table } from 'antd'
import { handlePage } from '../../src/core/index.mjs';
import StockUsecases from '../../src/usecases/StockUsecases';


export default function stockValuation({ stocks }) {

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Наименовние',
      dataIndex: 'StockId',
      sorter: true,
    },
    {
      title: 'Дата оценки',
      dataIndex: 'AssessmentDate',
      sorter: true,
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
      dataIndex: 'Volume',
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
          // dataSource={tableData}
          // pagination={params.pagination}
          // onChange={handleTableChange}
        />
      
    </>

  )
}

export const getServerSideProps = handlePage(StockUsecases, 'index', 'access:stocks_read');