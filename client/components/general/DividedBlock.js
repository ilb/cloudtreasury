import styles from '../../styles/components/General.module.scss';
import { Divider } from 'antd';
import classNames from 'classnames';

const DividedBlock = ({ children, title }) => {
  return (
    <div className={classNames(styles.dividedBlock, 'mb8')}>
      <Divider className={styles.dividerTop} orientation="left" plain>
        {title}
      </Divider>
      {children}
    </div>
  );
};

export default DividedBlock;
