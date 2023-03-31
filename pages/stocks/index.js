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

  const {
    /** @type {StockSchema} */ stockSchema,
    /** @type {StockResource} */ stockResource
  } = useContext(AwilixContext);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(false);
  const [value, setValue] = useState('');
  const initialCurrentStock = {
    data: {
      id: null,
      ticker: null,
      isin: null,
      value: null
    }
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
      await stockResource.delete(currentStock.id)
      Notification.info('Запись удалена');
      // setValue('');
      await router.replace(router.asPath);
      // setCurrentStock(initialCurrentStock);
      setIsModalOpen(false);
    } catch (e) {
      Notification.error('Упс... Что-то пошло не так.', e.message)
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const sendForm = async (formData) => {
    try {
      await stockResource.store(formData);
      Notification.info('Запись изменена / добавлена');
      // setValue('');
      // setCurrentStock(initialCurrentStock); // There is no cleaning of the form
      await router.replace(router.asPath);
    } catch (e) {
      Notification.error('Что-то пошло не так'); // В e.message всегда ReadableStream
    }
  };

  const options = useMemo(() => {
    if (props.stockList.length) {
      return props.stockList.map((stock) => {
        return {
          data: stock,
          label: stock.ticker,
          value: stock.id
        };
      });
    }
  }, [props.stockList]);

  const InputHandler = (value, data) => {
    setShowTicker(false);
    setValue(value);
    setCurrentStock(data.data);
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
                  onChange={InputHandler}
                />
                <Button type="primary" onClick={showModal}>Удалить</Button>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Данные ценной бумаги">
                <AutoForm schema={createSchemaBridge(stockSchema.get())} onSubmit={sendForm} model={currentStock}>
                  {showTicker && <AutoField name="ticker" />}
                  <AutoField name="value" />
                  <AutoField name="isin" />

                  <Space size={8}>
                    <SubmitField value="Сохранить" />
                    <Button type="primary" onClick={addButtonHandler}> Создать </Button>  {/* Можно сделать переключение формы по табсам */}
                  </Space>

                </AutoForm>
              </Card>
            </Col>
          </Row>
      </Layout>
    </div>
  )
}

export const getServerSideProps = handlePage(StockUsecases, 'index', 'access:roles_read');
