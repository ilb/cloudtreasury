import {Button, Col, Layout, Modal, Row, Space} from 'antd';
import { Card } from 'antd';
import {useContext, useMemo, useState} from 'react';
import Notification from '../../client/helpers/Notification';
import { handlePage } from '../../src/core/index.mjs';
import { AwilixContext } from '../_app';
import {AutoField, AutoForm, SubmitField} from "uniforms-antd";
import {useRouter} from "next/router";
import createSchemaBridge from "../../src/libs/uniforms-bridge.mjs";
import Search from "../../client/components/core/Search";
import StockUsecases from "../../src/usecases/StockUsecases";

export default function Stocks(props) {

  const { /** @type {stockSchema, stockResource} */ stockSchema, stockResource } = useContext(AwilixContext);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(false);
  const [value, setValue] = useState('');
  const initialCurrentStock = {
    stock_id: null,
    ticker: null,
    value: null,
    isin: null
  };
  const [currentStock, setCurrentStock] = useState(initialCurrentStock);

  const addButtonHandler = () => {
    setCurrentStock(initialCurrentStock);
    setValue('');
    setShowTicker(true);
  };

  const showModal = () => {
    if (currentStock.value) {
      setIsModalOpen(true);
    } else {
      Notification.error('Вы не выбрали запись');
    }
  };
  const handleOkModal = async () => {
    try {
      await stockResource.delete(currentStock.stock_id)
      Notification.info('Запись удалена');
      router.replace(router.asPath);
    } catch (e) {
      Notification.error('Упс... Что-то пошло не так.', e.message)
    }
    setValue('');
    setCurrentStock(initialCurrentStock);
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const sendForm = async (formData) => {
    // Maybe вынести в StockResources
    if (currentStock.stock_id) {
      try {
        await stockResource.update(currentStock.stock_id, currentStock);
        router.replace(router.asPath);
        Notification.info('Запись обновлена');
      } catch (e) {
        Notification.error('Что-то пошло не так', e.message);
      }
    } else {
      try {
        await stockResource.create(currentStock);
        router.replace(router.asPath);
        Notification.info('Запись создана');
      } catch (e) {
        Notification.error('Упс... Что-то пошло не так.', e.message)
      }
    }
    setValue('');
    setCurrentStock(initialCurrentStock);
  };

  const options = useMemo(() => {
    if (props.stockList.length) {
      return props.stockList.map((stock) => {
        return {
          label: stock.ticker,
          value: stock.stock_id
        };
      });
    }
  }, [props.stockList]);

  const InputHandler = (value) => {
    setShowTicker(false);
    setValue(value);
    setCurrentStock(props.stockList.find((el) => el.stock_id == value));
  };

  return (
    <div>
      <Layout>
          <Modal
            title="Подтверждение удаления"
            open={isModalOpen}
            onOk={handleOkModal}
            onCancel={handleCancelModal}>
            <p>Вы уверены, что хотите удалит запись: {currentStock.ticker}?</p>
          </Modal>
          <Row
            gutter={16}
            type="flex"
            justify="center"
            style={{ minHeight: '100vh', padding: '15px 0px 0px 0px' }}>
            <Col span={8}>
              <Card title="Выбор ценной бумаги">
                <Search
                  placeholder="Выберите stock"
                  value={value}
                  options={options}
                  handler={InputHandler}
                />
                <Space size={8} style={{ marginTop: '15px' }}>
                  <Button type="primary" onClick={addButtonHandler}>
                    Добавить
                  </Button>
                  <Button type="primary" onClick={showModal}>
                    Удалить
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Данные ценной бумаги">
                <AutoForm schema={createSchemaBridge(stockSchema.get(), {})} onSubmit={sendForm}>
                  {showTicker && (
                    <AutoField
                      name="ticker"
                      value={currentStock.ticker}
                      onInput={(e) => setCurrentStock({ ...currentStock, ticker: e.target.value })}
                    />
                  )}
                  <AutoField
                    value={currentStock.value}
                    onInput={(value) => setCurrentStock({ ...currentStock, value: value })} // Здесь возразщает сразу e.target.value, вместо event`a
                    name="value"
                  />
                  <AutoField
                    value={currentStock.isin}
                    onInput={(e) => setCurrentStock({ ...currentStock, isin: e.target.value })}
                    name="isin"
                  />
                  <SubmitField value="Сохранить" />
                </AutoForm>
              </Card>
            </Col>
          </Row>
      </Layout>
    </div>
  )
}

export const getServerSideProps = handlePage(StockUsecases, 'index', 'access:roles_read');
