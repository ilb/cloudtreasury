import { Card, Menu } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';

export default function NavMenu({ selectedMenuItem }) {
  const [menuItem, setMenuItem] = useState(selectedMenuItem);

  return (
    <Card size="small" className="mb16 pb8">
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={[menuItem]}>

        <Menu.Item key="calculations">
          <Link href="/calculations" onClick={() => {
            setMenuItem('calculations');
          }} legacyBehavior={false}>
            Расчёты
          </Link>
        </Menu.Item>

        <Menu.Item key="stockValuation">
          <Link href="/calculations/stockValuation" onClick={() => {
            setMenuItem('stockValuation');
          }} legacyBehavior={false}>
            Расчёт справедливой стоимости
          </Link>
        </Menu.Item>

      </Menu>
    </Card>
  );
}
