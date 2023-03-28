import { Col, Modal, Row, Table, Typography } from 'antd';
import { AutoField, AutoForm, BoolField, SubmitField } from 'uniforms-antd';
import createSchemaBridge from '../../../src/libs/uniforms-bridge.mjs';
import RoleSchema from '../../scheme/RoleSchema.mjs';
import { useContext, useEffect, useState } from 'react';
import Notification from '../../helpers/Notification';
import { arrayColumn, objectFill } from '../../helpers/utils.mjs';
import { AwilixContext } from '../../../pages/_app';
const { Title } = Typography;

const RoleModal = ({ role = {}, permissions, isOpen, hideModal, afterSave }) => {

  const {
    /** @type {RoleResource} */ roleResource,
    /** @type {RoleSchema} */ roleSchema,
  } = useContext(AwilixContext);

  const [model, setModel] = useState(role);
  useEffect(() => {
    setModel(buildModel(role));
  }, [role?.id]);

  const store = (data) => {
    roleResource.store({ ...data, id: role?.id })
      .then((result) => {
        Notification.success();
        hideModal();
        afterSave && afterSave(result);
      })
      .catch((err) => Notification.error(err.message));
  };

  function buildModel(role) {
    if (role.id) {
      return {
        title: role.title,
        code: role.code,
        permissions: objectFill(arrayColumn(role.permissions, 'code'), true),
      };
    } else {
      return {};
    }
  }

  const isCreate = () => !model?.id;

  const getTitle = () => (isCreate() ? 'Создание' : 'Редактирование');

  const mapPermissions = (permissions) => {
    return Object.values(
      permissions.reduce((acc, cur) => {
        const [name, type] = cur.code.split('_');

        if (!acc[name]) {
          acc[name] = {};
        }

        acc[name][type] = cur;

        return acc;
      }, {}),
    );
  };

  const PermissionCheckbox = (permission) => {
    return (
      <span className="defaultCheckbox">
        {permission ? (
          <BoolField checkbox={true} name={`permissions.${permission.code}`} />
        ) : (
          <>—</>
        )}
      </span>
    );
  };

  const columns = [
    {
      dataIndex: 'read',
      render: PermissionCheckbox,
    },
    {
      dataIndex: 'create',
      render: PermissionCheckbox,
    },
    {
      dataIndex: 'update',
      render: PermissionCheckbox,
    },
    {
      dataIndex: 'delete',
      render: PermissionCheckbox,
    },
  ];

  return (
    <>
      <Modal title={getTitle()} visible={isOpen} footer={null} onCancel={hideModal} width={1200}>
        <AutoForm
          layout="horizontal"
          schema={createSchemaBridge(roleSchema.get(permissions))}
          onSubmit={store}
          model={model}>
          <Row>
            <Col xs={24} xl={12}>
              <AutoField name="title" />
            </Col>
            <Col xs={24} xl={12}>
              <AutoField name="code" />
            </Col>
          </Row>
          <Title level={5}>Права</Title>
          <Table
            bordered
            pagination={false}
            showHeader={false}
            columns={columns}
            dataSource={mapPermissions(permissions)}
          />
          <SubmitField className="wrapperTop" value="Сохранить" />
        </AutoForm>
      </Modal>
    </>
  );
};

export default RoleModal;
