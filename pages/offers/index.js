import { Typography } from 'antd';
import { Card } from 'antd';

const { Title } = Typography;

export default function Offers() {

  return (
    <div>
      <Card>
        <Title level={4}>
          <span>Заявки</span>
        </Title>
      </Card>
    </div>
  )
}
