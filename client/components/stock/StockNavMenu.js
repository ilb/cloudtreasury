import { Menu } from 'antd'
import React, { useState } from 'react'
import Link from 'next/link';

export default function NavMenu({ selectedMenuItem }) {
    const [menuItem, setMenuItem] = useState(selectedMenuItem);

    return (
          
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={[menuItem]} > 

            <Menu.Item key="offers">
                <Link href={'/offers'} onClick={() => {setMenuItem('offers')}} legacyBehavior={false}>
                    Расчёты
                </Link>
            </Menu.Item>  

            <Menu.Item key="stockValuation">
                <Link href={'/offers/stockValuation'} onClick={() => {setMenuItem('stockValuation')}} legacyBehavior={false}>
                    Расчёт справедливой стоимости
                </Link>
            </Menu.Item>

            <Menu.Item key="report">
                <Link href={'/offers/report'} onClick={() => {setMenuItem('report')}} legacyBehavior={false}>
                    Отчёты
                </Link>
            </Menu.Item>  
    </Menu>
  )
}
