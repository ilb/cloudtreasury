import { Button, Table, Typography } from 'antd';
import { Card } from 'antd';
import { useContext, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import btnStyles from '../../client/styles/components/buttons.module.scss'
import RoleUsecases from '../../src/usecases/RoleUsecases.mjs';
import Access from '../../client/components/core/Access';
import RoleModal from '../../client/components/modals/RoleModal';
import Notification from '../../client/helpers/Notification';
import { handlePage } from '../../src/core/index.mjs';
import { AwilixContext } from '../_app';
const { Title } = Typography;

export default function Roles({ roles, permissions }) {
  const { /** @type {RoleResource} */ roleResource } = useContext(AwilixContext);

  const [isOpen, setOpen] = useState(false);
  const [editedRole, setEditedRole] = useState({});
  const [tableData, setTableData] = useState(roles);

  const refresh = async () => {
    const roles = await roleResource.getList();

    setTableData(roles);
  }

  const create = () => {
    setEditedRole({});
    setOpen(true);
  }

  const edit = (role) => {
    setEditedRole(role);
    setOpen(true);
  }

  const remove = async (role) => {
    if (confirm(`Удалить роль ${role.title}?`)) {
      roleResource.delete(role.id).then(() => {
        Notification.success();
        refresh();
      }).catch(err => Notification.error(err.message));
    }
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Название',
      dataIndex: 'title',
      sorter: (a, b) => a.title > b.title
    },
    {
      title: 'Код',
      dataIndex: 'code',
      sorter: (a, b) => a.code > b.code
    },
    {
      title: 'Действия',
      render: (record) => (
        <div className={btnStyles.button_group}>
          <Button onClick={() => edit(record)} type="primary" shape="circle" icon={<EditOutlined/>}/>
          <Button onClick={() => remove(record)} type="primary" danger shape="circle" icon={<DeleteOutlined/>}/>
        </div>
      )
    },
  ];

  return (
    <div>
      <Card>
        <Title level={4}>
          <span>Роли</span>
          <Access permission='roles_create'>
            <span className="right">
              <Button onClick={create} key="1" type="primary">Создать</Button>
            </span>
          </Access>
        </Title>
        <Table
          columns={columns}
          dataSource={tableData}
        />
      </Card>
      <RoleModal role={editedRole} permissions={permissions} isOpen={isOpen} hideModal={() => setOpen(false)} afterSave={refresh} />
    </div>
  )
}

export const getServerSideProps = handlePage(RoleUsecases, 'index', 'access:roles_read');
