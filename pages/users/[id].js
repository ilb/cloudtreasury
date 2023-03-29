import { useState } from 'react';
import { Col, Row } from 'antd';
import UserUsecases from '../../src/usecases/UserUsecases.mjs';
import styles from '../../client/styles/pages/User.module.scss';
import UserProfileCard from '../../client/components/profile/UserProfileCard';
import UserInfoCard from '../../client/components/profile/UserInfoCard';
import { handlePage } from '../../src/core/index.mjs';

export default function Home({ roles, user }) {
  const [userData, setUser] = useState(user);
  const afterSave = async (user) => setUser(user);

  return (
    <div className={styles.userProfile}>
      <Row gutter={16}>
        <Col span={8}>
          <UserProfileCard user={userData} roles={roles} afterSave={afterSave} />
        </Col>
        <Col span={16}>
          <UserInfoCard />
        </Col>
      </Row>
    </div>
  );
}

export const getServerSideProps = handlePage(UserUsecases, 'show', 'access:users_read');
