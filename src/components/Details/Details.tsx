import { FC } from 'react';
import { PersonDetails } from '../../types/types';
import styles from './Details.module.css';

type IProps = {
  person: PersonDetails;
};

const Details: FC<IProps> = ({ person }) => {
  return (
    <div className={styles.wrapper}>
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
      <div>
        eye color:
        <strong>{person.eye_color}</strong>
      </div>
      <div>
        hair color:
        <strong>{person.hair_color}</strong>
      </div>
      <div>
        skin color:
        <strong>{person.skin_color}</strong>
      </div>
    </div>
  );
};

export default Details;
