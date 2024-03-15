import { Alert, Card, Col, Divider, Row, Typography } from 'antd';
import {handlePage} from "../src/core/index.mjs";
import StockUsecases from "../src/usecases/StockUsecases.mjs";

export default function Index() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <Typography.Title level={4}>Уведомления</Typography.Title>
            <Divider />
            <Alert
              className="my8"
              message="Info Text"
              description="Info Description Info Description Info Description Info Description"
              type="info"
            />
            <Alert
              className="my8"
              message="Info Text"
              description="Info Description Info Description Info Description Info Description"
              type="warning"
            />
            <Alert
              className="my8"
              message="Info Text"
              description="Info Description Info Description Info Description Info Description"
              type="success"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Typography.Title level={4}>Что-нибудь еще</Typography.Title>
            <Divider />
          </Card>
        </Col>
      </Row>
    </div>
);
}
export const getServerSideProps = handlePage(StockUsecases, 'index', 'access:stocks_read');
