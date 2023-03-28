import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	UsergroupAddOutlined,
	NodeIndexOutlined,
	ContainerOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd'
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import LoginBtn from './LoginBtn'
import { getUserPermissions } from '../../helpers/utils.mjs';
import { UserContext } from '../../../pages/_app';

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children, ...qwe }) => {
	const router = useRouter();
	const [collapsed, setCollapsed] = useState(true);
	const [tabs, setTabs] = useState([]);
  const session = useContext(UserContext);

  useEffect(() => {
    async function setSidebar() {
      const userPermissions = await getUserPermissions(session.user);

      setTabs(
        [
          {
            key: 'home',
            icon: <UserOutlined />,
            label: 'Домашняя',
            href: '/',
          },
          {
            key: 'offers',
            icon: <ContainerOutlined />,
            label: 'Заявки',
            href: '/offers',
            permission: 'offers_read',
          },
          {
            key: 'users',
            icon: <UsergroupAddOutlined />,
            label: 'Пользователи',
            href: '/users',
            permission: 'users_read',
          },
          {
            key: 'roles',
            icon: <NodeIndexOutlined />,
            label: 'Роли',
            href: '/dictionaries/roles',
            permission: 'roles_read',
          },
          {
            key: 'permissions',
            icon: <NodeIndexOutlined />,
            label: 'Права',
            href: '/dictionaries/permissions',
            permission: 'permissions_read',
          },
          {
            key: 'errors',
            icon: <NodeIndexOutlined />,
            label: 'Ошибки',
            href: '/dictionaries/errorDescriptions',
            permission: 'errors_read',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Ошибки',
            href: '/settings',
            permission: 'settings_read',
          },
        ].filter((tab) => !tab.permission || userPermissions.includes(tab.permission)),
      );
    }

    setSidebar();
  }, [session]);

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo"/>
				<Menu
					onClick={async (event) => {
						await router.push(event.item.props.href)
					}}
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={tabs}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{
						padding: 0
					}}>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => setCollapsed(!collapsed)
					})}
					<LoginBtn/>
				</Header>
				<Content
					style={{ margin: '16px' }}>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}

export default AppLayout
