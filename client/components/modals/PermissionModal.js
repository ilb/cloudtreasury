import { Col, Modal, Row } from 'antd';
import { AutoField, AutoForm, SubmitField } from 'uniforms-antd';
import createSchemaBridge from '../../../src/libs/uniforms-bridge.mjs';
import PermissionSchema from '../../scheme/PermissionSchema.mjs';
import { useContext, useEffect, useState } from 'react';
import Notification from '../../helpers/Notification';
import PermissionResource from '../../resources/PermissionResource.mjs';
import { AwilixContext } from '../../../pages/_app';

const PermissionModal = ({ permission = {}, isOpen, hideModal, afterSave }) => {
  const {
    /** @type {PermissionResource} */ permissionResource,
    /** @type {PermissionSchema} */ permissionSchema,
  } = useContext(AwilixContext);

  const [model, setModel] = useState(permission);

  useEffect(() => {
    setModel(permission);
  }, [permission?.id]);

  const store = (data) => {
    permissionResource.store({ ...data, id: permission?.id }).then(result => {
      Notification.success();
      hideModal();
      afterSave && afterSave(result);
    }).catch(err => Notification.error(err.message));
  };

  const isCreate = () => !model?.id;

  const getTitle = () => isCreate() ? 'Создание' : 'Редактирование';

  return (
    <>
      <Modal title={getTitle()} visible={isOpen} footer={null} onCancel={hideModal}>
        <AutoForm schema={createSchemaBridge(permissionSchema.get())} onSubmit={store} model={model}>
          <AutoField name="title"/>
          <AutoField name="code"/>
          <SubmitField value="Сохранить"/>
        </AutoForm>
      </Modal>
    </>
  );
};

export default PermissionModal;