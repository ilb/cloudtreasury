import { Card, Col, Row, Spin } from 'antd';
import { handlePage } from '../../src/core/index.mjs';
import StockUsecases from '../../src/usecases/StockUsecases.mjs';
import { useContext, useMemo, useState } from 'react';
import { AwilixContext } from '../_app';
import createSchemaBridge from '../../src/libs/uniforms-bridge.mjs';
import { AutoField, DateField, ErrorsField, SelectField, SubmitField, AutoForm } from 'uniforms-antd';
import NavMenu from '../../client/components/stock/StockNavMenu.js';
import Notification from '../../client/helpers/Notification';
import moment from 'moment';
import ActiveMarket from '../../src/constants/ActiveMarket.mjs';

export default function StockValuation({ stocks }) {
  const {
    /** @type {TickerRatingSchema} */ tickerRatingSchema,
    /** @type {StockCalculationResultsSchema} */ stockCalculationResultsSchema,
    /** @type {CalculationResource} */ calculationResource,
  } = useContext(AwilixContext);

  const [loading, setLoading] = useState(false);
  const initialCurrentStock = {
    id: null,
    ticker: null,
    isin: null,
    value: null
  };
  const [currentStock, setCurrentStock] = useState(initialCurrentStock);
  const [calculationData, setCalculationData] = useState();

  const options = useMemo(() => {
    if (stocks && stocks.length) {
      return stocks.map((stock) => ({
        label: stock.ticker,
        value: stock.id
      }));
    }
  }, [stocks]);

  async function onSubmit({ date }) {
    setLoading(true);
    try {
      const calculations = await calculationResource.create({
        ticker: currentStock.ticker,
        isin: currentStock.isin,
        initialVolume: currentStock.value,
        date: moment(date).format('DD.MM.YYYY')
      });

      setCalculationData({
        date: calculations.date,
        ...calculations.data
      });
    } catch (e) {
      Notification.error('Что-то пошло не так. Проверьте введенный тикер, возможно по нему отсутствуют данные');
    }
    setLoading(false);
  }

  const onSelectStock = (stockId) => {
    setCurrentStock(stocks.find(({ id }) => id === stockId));
  };
  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase().trim()) !== -1;
  };
  
  return (
    <>
      <NavMenu selectedMenuItem="stockValuation" />
      <Row
        gutter={16}
        type="flex"
        justify="center"
      >
        <Col xs={24} sm={24} md={12} xxl={9}>
          <Card title="Данные ценной бумаги">
            <AutoForm schema={createSchemaBridge(tickerRatingSchema.get())} onSubmit={onSubmit} class="ant-form-vertical">
              <SelectField
                name="ticker"
                options={options}
                filterOption={filterOption}
                showSearch={true}
                onChange={onSelectStock}
              />
              <DateField format="DD.MM.YYYY" showTime={false} name="date" />
              <SubmitField value="Отправить" />
              <ErrorsField />
            </AutoForm>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} xxl={9}>
          <Card title="Результаты расчёта">
            <AutoForm
              schema={createSchemaBridge(stockCalculationResultsSchema.get())}
              model={calculationData}
              readOnly
              class="ant-form-vertical"
            >
              <Spin spinning={loading}>
                <AutoField name="date" readOnly />
                <AutoField name="active" options={ActiveMarket.list()} readOnly />
                <AutoField name="fairPrice" readOnly />
                <AutoField name="countDays" readOnly />
                <AutoField name="countDeals" readOnly />
                <AutoField name="initialVolume" readOnly />
                <AutoField name="tradingVolume" readOnly />
              </Spin>
            </AutoForm>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export const getServerSideProps = handlePage(StockUsecases, 'index', 'access:stocks_read');
