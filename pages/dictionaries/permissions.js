import { Button, Table, Typography } from 'antd';
import { Card } from 'antd';
import { useContext, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import btnStyles from '../../client/styles/components/buttons.module.scss'
import Access from '../../client/components/core/Access';
import PermissionUsecases from '../../src/usecases/PermissionUsecases.mjs';
import Notification from '../../client/helpers/Notification';
import PermissionModal from '../../client/components/modals/PermissionModal';
import { handlePage } from '../../src/core/index.mjs';
import { AwilixContext } from '../_app';

const { Title } = Typography;

export default function Permissions({ data }) {
  const { /** @type {PermissionResource} */ permissionResource } = useContext(AwilixContext);

  const [isOpen, setOpen] = useState(false);
  const [editedPermission, setEditedPermission] = useState({});
  const [tableData, setTableData] = useState(data);

  const refresh = async () => {
    const permissions = await permissionResource.getList();

    setTableData(permissions);
  }

  const create = () => {
    setEditedPermission({});
    setOpen(true);
  }

  const edit = (permission) => {
    setEditedPermission(permission);
    setOpen(true);
  }

  const remove = async (permission) => {
    if (confirm(`Удалить право ${permission.title}?`)) {
      permissionResource.delete(permission.id).then(() => {
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
      render: (record) =>
        (
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
          <span>Права</span>
          <Access permission='permissions_create'>
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
      <PermissionModal permission={editedPermission} isOpen={isOpen} hideModal={() => setOpen(false)} afterSave={refresh} />
    </div>
  )
}

export const getServerSideProps = handlePage(PermissionUsecases, 'index', 'access:permissions_read');
