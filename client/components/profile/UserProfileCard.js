import { Avatar, Button, Card, Dropdown, Menu, Space, Tag } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import Notification from '../../helpers/Notification';
import { useContext, useEffect, useState } from 'react';
import EditUserModal from './EditUserModal';
import Access from '../core/Access';
import UserModelBuilder from '../../builders/UserModelBuilder.mjs';
import { AwilixContext } from '../../../pages/_app';

const UserProfileCard = ({ user, roles, afterSave }) => {
  const { /** @type {UserResource} */ userResource, userSchema } = useContext(AwilixContext);

  const [model, setModel] = useState({});
  const [actions, setActions] = useState([]);
  const [isOpenEdit, openEdit] = useState(false);

  useEffect(() => {
    setActions([
      <EditOutlined key="edit" onClick={() => openEdit(true)} />,
      <Dropdown key="actions" overlay={<Menu
        items={[
          {
            key: '1',
            label: (
              <>
                {user.isBlocked && (
                  <Button onClick={unblock} type="text">Разблокировать</Button>
                )}
                {!user.isBlocked && (
                  <Button onClick={block} danger type="text">Заблокировать</Button>
                )}
              </>
            )
          }
        ]}
      />}>
        <Space>
          <EllipsisOutlined style={{ fontSize: 16 }} />
        </Space>
      </Dropdown>
    ]);
  }, [user.isBlocked]);
  useEffect(() => {
    setModel(UserModelBuilder.make(user, userSchema.get()));
  }, [user]);

  const block = async () => {
    model.isBlocked = true;
    await save(model);
  };

  const unblock = async () => {
    model.isBlocked = false;
    await save(model);
  };

  const save = async () => {
    userResource.update(user.id, model).then(result => {
      Notification.success();
      afterSave && afterSave(result);
    }).catch((error) => Notification.error(error.message));
  };

  return (
    <Card actions={actions}>
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={
          <div>
            <span>{user.name}</span>
            <span className="user-status">
              {user.isBlocked && <Tag color="error">Заблокирован</Tag>}
              {!user.isBlocked && <Tag color="success">Активен</Tag>}
            </span>
          </div>
        }
        description={user?.relationMembers[0] && user?.relationMembers[0].role?.title || 'Нет роли'}
      />
      <Access permission="users_update">
        <EditUserModal
          isOpen={isOpenEdit}
          hideModal={() => openEdit(false)}
          afterSave={afterSave}
          user={user}
          roles={roles}
        />
      </Access>
    </Card>
  );
};

export default UserProfileCard;