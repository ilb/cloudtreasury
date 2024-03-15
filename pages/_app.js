import 'antd/dist/antd.css';
import '../client/styles/core.scss';
import Layout from '../client/components/core/Layout';
import GuestLayout from '../client/components/core/GuestLayout';
import App from 'next/app';
import React, { createContext } from 'react';
import '../client/helpers/functions.mjs';
import WebKernel from '../client/WebKernel.mjs';
import { ConfigProvider } from 'antd';
import ru from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import xforwardCheck from '../src/utils/xForwardCheck.mjs';

export const UserContext = createContext({});
export const AwilixContext = createContext({});

if (typeof window === "undefined") {
  require("../src/stubs/index");
}


function MyApp({ Component, pageProps, session }) {
  console.log('session', session)
  const kernel = new WebKernel();
  const scope = kernel.createApplication();

  return (
    <ConfigProvider locale={ru}>
      <AwilixContext.Provider value={scope.cradle}>
        <UserContext.Provider value={session}>
          <title>Оформление сделки</title>
          {session && (
            <>
              <Layout session={session}>
                <Component {...pageProps} />
              </Layout>
            </>
          )}
          {!session && (
            <GuestLayout>
              <Component {...pageProps} />
            </GuestLayout>
          )}
        </UserContext.Provider>
      </AwilixContext.Provider>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  xforwardCheck(context.ctx.req);
  const { session, pageProps } = await App.getInitialProps(context);
  return { session, pageProps };
};

export default MyApp;
