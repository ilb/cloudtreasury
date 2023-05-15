import { Button, Card, Col, Layout, Modal, Row, Space } from 'antd';
import { useContext, useMemo, useState } from 'react';
import Notification from '../../client/helpers/Notification';
import { handlePage } from '../../src/core/index.mjs';
import { AwilixContext } from '../_app';
import { AutoField, AutoForm, SubmitField } from 'uniforms-antd';
import { useRouter } from 'next/router';
import createSchemaBridge from '../../src/libs/uniforms-bridge.mjs';
import SearchStock from '../../client/components/stock/SearchStock';
import StockUsecases from '../../src/usecases/StockUsecases';

let formRef;

export default function Stocks({ stocks }) {

  const {
    /** @type {StockSchema} */ stockSchema,
    /** @type {StockResource} */ stockResource
  } = useContext(AwilixContext);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(false);
  const [value, setValue] = useState('');
  const initialCurrentStock = {
    id: null,
    ticker: null,
    isin: null,
    value: null
  };
  const [currentStock, setCurrentStock] = useState(initialCurrentStock);
  const onClickCreateBtn = () => {
    resetForm();
    setValue('');
    setShowTicker(true);
  };

  const resetForm = () => {
    setCurrentStock(initialCurrentStock);
    formRef.reset();
  };

  const showModal = () => {
    if (currentStock.value) {
      setIsModalOpen(true);
    } else {
      Notification.error('Вы не выбрали запись');
    }
  };
  const onClickDeleteBtn = async () => {
    try {
      setIsModalOpen(false);
      await stockResource.delete(currentStock.id);
      Notification.info('Запись удалена');
      await router.replace(router.asPath);
      resetForm();
      setValue('');
    } catch (e) {
      Notification.error('Упс... Что-то пошло не так.', e.message);
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const sendForm = async (formData) => {
    try {
      await stockResource.store(formData);
      Notification.info(`Запись ${formData.id ? 'изменена' : 'добавлена'}`);
      await router.replace(router.asPath);
      !formData.id && resetForm();
    } catch (e) {
      Notification.error('Что-то пошло не так');
    }
  };

  const onSelectStock = (value, item) => {
    setShowTicker(false);
    setValue(value);
    setCurrentStock(item.stock);
  };

  return (
    <div>
      <Layout>
        <Modal
          title="Подтверждение удаления"
          open={isModalOpen}
          okText="Удалить"
          cancelText="Отмена"
          onOk={onClickDeleteBtn}
          onCancel={handleCancelModal}>
          <p>Вы уверены, что хотите удалить запись: {currentStock.ticker}?</p>
        </Modal>
        <Row justify="center">
          <Col xs={24} sm={24} md={12} xxl={8} className="mb16">
            <Card title={
              <>
                <span>Выбор ценной бумаги</span>
                <Button className="right" type="primary" size="small" onClick={onClickCreateBtn}>Создать</Button>
              </>
            }>
              <SearchStock
                stocks={stocks}
                value={value}
                onChange={onSelectStock}
                ></SearchStock>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12} xxl={8}>
            <Card title="Данные ценной бумаги">
              <AutoForm
                schema={createSchemaBridge(stockSchema.get())}
                onSubmit={sendForm}
                model={currentStock}
                ref={(ref) => (formRef = ref)}
              >
                {showTicker && <AutoField name="ticker"/>}
                <AutoField name="value"/>
                <AutoField name="isin"/>

                <Space size={8}>
                  <Button type="danger" onClick={showModal}>Удалить</Button>
                  <SubmitField value="Сохранить"/>
                </Space>
              </AutoForm>
            </Card>
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

export const getServerSideProps = handlePage(StockUsecases, 'index', 'access:stocks_read');
