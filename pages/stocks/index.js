import {Button, Col, Layout, Modal, Row, Space, Table, Typography} from 'antd';
import { Card } from 'antd';
import {useContext, useMemo, useState} from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import btnStyles from '../../client/styles/components/buttons.module.scss'
import RoleUsecases from '../../src/usecases/RoleUsecases.mjs';
import Access from '../../client/components/core/Access';
import RoleModal from '../../client/components/modals/RoleModal';
import Notification from '../../client/helpers/Notification';
import { handlePage } from '../../src/core/index.mjs';
import { AwilixContext } from '../_app';
import {AutoField, AutoForm, SubmitField} from "uniforms-antd";
import {useRouter} from "next/router";
import createSchemaBridge from "../../src/libs/uniforms-bridge.mjs";
import Search from "../../client/components/core/Search";
import StockUsecases from "../../src/usecases/StockUsecases";
const { Title } = Typography;

export default function stock(props) {

  const { /** @type {stockSchema} */ stockSchema } = useContext(AwilixContext);

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
      message.error('Вы не выбрали запись');
    }
  };
  const handleOkModal = async () => {
    try {
      const result = await fetchUrl(
        `/cloudtreasury/api/admin/deleteStock/${currentStock.stock_id}`
      );
      message.info(result.message);
      router.replace(router.asPath);
    } catch (e) {
      message.error(e.message);
    }
    setValue('');
    setCurrentStock(initialCurrentStock);
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const sendForm = async (formData) => {
    console.log(currentStock);
    if (currentStock.stock_id) {
      try {
        const result = await fetchUrl(
          `/cloudtreasury/api/admin/updateStock/${currentStock.stock_id}`,
          'POST',
          formData
        );
        message.info(result.message);
        router.replace(router.asPath);
      } catch (e) {
        message.error(e.message);
      }
    } else {
      try {

        const result = await fetchUrl('/cloudtreasury/api/admin/createStock', 'POST', formData);
        message.info(result.message);
        router.replace(router.asPath);
      } catch (e) {
        message.error(e.message);
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
