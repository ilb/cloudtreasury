import { Button, Table, Tag, Typography } from 'antd';

const { Title } = Typography;
import { Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserUsecases from '../../src/usecases/UserUsecases.mjs';
import EditUserModal from '../../client/components/profile/EditUserModal';
import Access from '../../client/components/core/Access';
import { handlePage } from '../../src/core/index.mjs';
import { AwilixContext } from '../_app';

export default function UserList({ roles }) {
  const { /** @type {UserResource} */ userResource } = useContext(AwilixContext);

  const router = useRouter();
  const [params, setParams] = useState({ pagination: { current: 1, pageSize: 10 } });
  const [tableData, setTableData] = useState([]);
  const [isOpenEdit, openEdit] = useState(false);

  const fetchData = async ({ pagination, filters, sorter }) => {
    const data = await userResource.getList({ ...pagination, ...filters, ...sorter })
    setTableData(data.rows)
    setParams({ pagination: { ...pagination, total: data.total}, filters, sorter })
  }

  useEffect(() => {
    fetchData(params);
  }, []);


  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      sorter: true,
    },
    {
      title: 'Роль',
      dataIndex: ['relationMembers', 0, 'role', 'title'],
    },
    {
      title: 'Статус',
      dataIndex: 'isBlocked',
      render: (isBlocked) => {
        return (
          <span className="user-status">
            {isBlocked && <Tag color="error">Заблокирован</Tag>}
            {!isBlocked && <Tag color="success">Активен</Tag>}
          </span>
        );
      }
    },
  ];

  const handleTableChange = async (pagination, filters, sorter) => {
    await fetchData({ pagination, filters, ...(sorter.column && { sorter })});
  };

  return (
    <div>
      <Card>
        <Title level={4}>
          <span>Пользователи</span>
          <Access permission='users_create'>
            <span className="right">
              <Button onClick={() => openEdit(true)} type="primary">Создать</Button>
              <EditUserModal
                isOpen={isOpenEdit}
                hideModal={() => openEdit(false)}
                roles={roles}
                afterSave={() => fetchData(params)}
              />
            </span>
          </Access>
        </Title>
        <Table
          onRow={(record) => ({
            onClick: async () => await router.push(`users/${record.id}`)
          })}
          columns={columns}
          dataSource={tableData}
          pagination={params.pagination}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  )
}

export const getServerSideProps = handlePage(UserUsecases, 'index', 'access:users_read');
