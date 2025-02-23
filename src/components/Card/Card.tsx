import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleItemSelection } from '../../redux/slices/selectionSlice';
import { Person } from '../../types/types';
import styles from './Card.module.css';

type IProps = {
  person: Person;
};

const Card: FC<IProps> = ({ person }) => {
  const personId = person.url.split('/')[5];

  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selection.selectedItems.some((item) => item.url === person.url)
  );

  const handleSelection = () => {
    dispatch(toggleItemSelection(person));
  };

  return (
    <Link to={`/details/${personId}`} className={styles.card}>
      <input type="checkbox" checked={isSelected} onChange={handleSelection} />
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
