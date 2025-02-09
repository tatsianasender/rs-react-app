import { FC } from 'react';
import { Person } from '../../types/types';
import styles from './Card.module.css';

type IProps = {
  person: Person;
  onClick: () => void;
};

const Card: FC<IProps> = ({ person, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h4>{person.name}</h4>
      <div>
        gender:
        <strong>{person.gender}</strong>
      </div>
      <div>
        birth year:
        <strong>{person.birth_year}</strong>
      </div>
    </div>
  );
};

export default Card;
