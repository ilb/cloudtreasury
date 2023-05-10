import { Col, Layout, Row, Spin } from 'antd';
import { Card } from 'antd';
import { handlePage } from '../../src/core/index.mjs';
import StockUsecases from '../../src/usecases/StockUsecases.js';
import { useContext, useState } from 'react';
import SearchStock from '../../client/components/stock/SearchStock.js';
import { AwilixContext } from '../_app';
import { AutoForm } from 'uniforms';
import createSchemaBridge from '../../src/libs/uniforms-bridge.mjs';
import { AutoField, DateField, ErrorsField, SubmitField } from 'uniforms-antd';
import NavMenu from '../../client/components/stock/StockNavMenu.js';
import Notification from '../../client/helpers/Notification';

export default function StockValuation({ stocks }) {
  const {
    /** @type {TickerRatingSchema} */ tickerRatingSchema,
    /** @type {StockCalculationResultsSchema} */ stockCalculationResultsSchema,
    /** @type {StockValutionsResource} */ stockValutionsResource
  } = useContext(AwilixContext);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const initialCurrentStock = {
    id: null,
    ticker: null,
    isin: null,
    value: null
  };
  const [currentStock, setCurrentStock] = useState(initialCurrentStock);
  const [calculationData, setCalculationData] = useState({date: null, active: null, fairPrice: null, countDays: null, countDeals: null, initialVolume: null, tradingVolume: null});

  async function onSubmit({ date }) {
    setLoading(true);
      try {
      const calculationData = await stockValutionsResource.create({
        ticker: currentStock.ticker,
        isin: currentStock.isin,
        initialVolume: currentStock.value,
        date: new Date(date).toISOString().slice(0, 10),
      });
      setCalculationData({
        ...calculationData.calculations,
        date: calculationData.calculations.date,
        active: calculationData.calculations.active === 'ACTIVE' ? 'Да' : 'Нет'
      });
    } catch (e) {
      Notification.error('Что-то пошло не так. Проверьте введенный тикер, возможно по нему отсутствуют данные');
    }
    setLoading(false);
  }


  const onSelectStock = (value, item) => {
    setValue(value);
    setCurrentStock(item.stock);
  };

  return (
    <>
      <NavMenu selectedMenuItem={'stockValuation'} />


      <Layout>
        <Layout>
          <Layout.Content>
            <Row
              gutter={16}
              type="flex"
              justify="center"
              style={{padding: '15px 0px 0px 0px' }}
              >
              <Col xs={24} sm={24} md={12} xxl={8}>
                <Card title="Тикер">
                  <AutoForm schema={createSchemaBridge(tickerRatingSchema.get())} onSubmit={onSubmit} class="ant-form-vertical">
                    {/* <AutoField name='ticker' component={SearchStock} /> */}
                    <SearchStock
                    name='ticker'
                    stocks={stocks}
                    value={value}
                    onChange={onSelectStock}
                    ></SearchStock> 
                    <DateField format="YYYY-MM-DD" showTime={false} name='date' /> 
                    <SubmitField value="Отправить" />
                    <ErrorsField />
                  </AutoForm>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} xxl={8}>
                <Card title="Результаты расчёта" >
                  <AutoForm schema={createSchemaBridge(stockCalculationResultsSchema.get())} model={calculationData} readOnly class="ant-form-vertical">
                    <Spin spinning={loading}>
                      <AutoField name="date" readOnly />
                      <AutoField name="active" readOnly />
                      <AutoField name="fairPrice" readOnly />
                      <AutoField name="countDays" readOnly />
                      <AutoField name="countDeals" readOnly />
                      <AutoField name="initialVolume" readOnly />
                      <AutoField name="tradingVolume"readOnly />
                    </Spin>
                  </AutoForm>
                </Card>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  )
}

export const getServerSideProps = handlePage(StockUsecases, 'index', 'access:stocks_read');
