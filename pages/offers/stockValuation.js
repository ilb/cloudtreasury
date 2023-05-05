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
    /** @type {StockCalculationResults} */ stockCalculationResults,
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

  async function onSubmit({ date }) {
    console.log()
    setLoading(true);
    await stockValutionsResource.create({ticker: currentStock.ticker, date: new Date(date).toISOString().slice(0, 10)});
    // const response = await fetch('/cloudtreasury/api/fairprice/calculations', {
    //   method: 'POST',
    //   body: JSON.stringify({ ticker: currentStock, date: new Date(date).toISOString().slice(0, 10) }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    setLoading(false);

    if (!response.ok) {
      await Notification.error('Что-то пошло не так. Проверьте введенный тикер, возможно по нему отсутствуют данные');
      return;
    }

    // setCalculateResult({ ...json, active: json.active === 'ACTIVE' ? 'Да' : 'Нет' });
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
                  <AutoForm schema={createSchemaBridge(stockCalculationResults.get())} readOnly class="ant-form-vertical">
                    <Spin spinning={loading}>
                      <AutoField name="receivedDate" readOnly />
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