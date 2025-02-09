import { FC } from 'react';
import { Person } from '../../types/types';
import styles from './Card.module.css';

type IProps = {
  person: Person;
};

const Card: FC<IProps> = ({ person }) => {
  return (
    <div className={styles.card}>
      <h4>{person.name}</h4>
      <div>
        gender:
        <strong>{person.gender}</strong>
      </div>
      <div>
        birth year:
        <strong>{person.birth_year}</strong>
      </div>
      <div>
        height:
        <strong>{person.height}</strong>
      </div>
      <div>
        weight:
        <strong>{person.mass}</strong>
      </div>
    </div>
  );
};

export default Card;
