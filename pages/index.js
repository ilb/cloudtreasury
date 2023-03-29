import { Alert, Card, Col, Divider, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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

