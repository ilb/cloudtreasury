import { Typography } from 'antd';
import { Card } from 'antd';

const { Title } = Typography;

export default function Settings() {

  return (
    <div>
      <Card>
        <Title level={4}>
          <span>Настройки приложения</span>
        </Title>
      </Card>
    </div>
  )
}
