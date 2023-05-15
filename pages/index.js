import { Alert, Card, Col, Divider, Row, Typography } from 'antd';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from './_app';

export default function Index() {
  const context = useContext(UserContext);
  return (
    <>
      {!context && (
        <Link href='/signin'>Авторизация</Link>
      )}
    </>
  );
}

