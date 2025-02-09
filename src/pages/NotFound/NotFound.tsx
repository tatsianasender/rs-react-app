import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
