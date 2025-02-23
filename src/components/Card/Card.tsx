import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/types';
import styles from './Card.module.css';

type IProps = {
  person: Person;
};

const Card: FC<IProps> = ({ person }) => {
  const personId = person.url.split('/')[5];

  return (
    <Link to={`/details/${personId}`} className={styles.card}>
      <h4>{person.name}</h4>
      <div>
        gender:
        <strong>{person.gender}</strong>
      </div>
      <div>
        birth year:
        <strong>{person.birth_year}</strong>
      </div>
    </Link>
  );
};

export default Card;
