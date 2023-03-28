import { withRouter } from 'next/router';
import { signIn, signUp } from '../client/resources/auth';
import Notification from '../client/helpers/Notification';
import { AutoField, AutoForm, SubmitField } from 'uniforms-antd';
import createSchemaBridge from '../src/libs/uniforms-bridge.mjs';
import { useContext } from 'react';
import { AwilixContext } from './_app';

const SignUp = ({ router }) => {
  const { /** @type {SignupSchema} */ signupSchema } = useContext(AwilixContext);

  const submit = (values) => {
    signUp(values).then(res => {
      if (res.ok) {
        signIn(values).then((res) => {
          if (res.ok) {
            router.push('/');
          } else {
            Notification.error(JSON.stringify(res.error));
          }
        });
      } else {
        Notification.error(JSON.stringify(res.error));
      }
    }) // todo refactor
  };

  return (
    <AutoForm schema={createSchemaBridge(signupSchema.get())} onSubmit={submit}>
      <AutoField name="login" />
      <AutoField name="name" />
      <AutoField name="password" />
      <SubmitField value="Зарегистрироваться" />
    </AutoForm>
  );
};

export default withRouter(SignUp);
