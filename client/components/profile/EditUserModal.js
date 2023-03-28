import { Modal } from 'antd';
import { AutoField, AutoForm, SubmitField } from 'uniforms-antd';
import createSchemaBridge from '../../../src/libs/uniforms-bridge.mjs';
import Map from '../../helpers/Map';
import { useContext, useEffect, useState } from 'react';
import UserResource from '../../resources/UserResource.mjs';
import Notification from '../../helpers/Notification';
import UserSchema from '../../scheme/UserSchema.mjs';
import UserModelBuilder from '../../builders/UserModelBuilder.mjs';
import { AwilixContext } from '../../../pages/_app';


const EditUserModal = ({ isOpen, hideModal, user = {} , roles, afterSave }) => {
  const {
    /** @type {UserResource} */ userResource,
    /** @type {UserSchema} */ userSchema,
  } = useContext(AwilixContext);
  const [model, setModel] = useState();

  const store = (data) => {
    userResource.store({ ...data, id: user?.id }).then(result => {
      Notification.success();
      hideModal();
      afterSave && afterSave(result);
    }).catch(err => Notification.error(err.message))
  };

  const isCreate = () => !model?.id;

  const getTitle = () => isCreate() ? 'Создание' : 'Редактирование';

  useEffect(() => {
    setModel(UserModelBuilder.make(user, userSchema.get()));
  }, [user?.id]);

  return (
    <>
      <Modal title={getTitle()} visible={isOpen} footer={null} onCancel={hideModal}>
        <AutoForm showInlineError schema={createSchemaBridge(userSchema.get())} onSubmit={store} model={model}>
          <AutoField name="login"/>
          <AutoField name="name"/>
          <AutoField name="roleId" options={Map.forSelect(roles)} />
          <SubmitField value="Сохранить" />
        </AutoForm>
      </Modal>
    </>
  )
}

export default EditUserModal;