import { FC } from 'react';
import Card from '../Card';
import { Person } from '../../types/types';
import styles from './SearchResults.module.css';

type IProps = {
  searchResults: Person[];
  onCardClick: (url: string) => void;
};

const SearchResults: FC<IProps> = ({ searchResults, onCardClick }) => {
  return (
    <div className={styles.wrapper}>
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Card
            key={index}
            person={result}
            onClick={() => onCardClick(result.url)}
          />
        ))
      ) : (
        <h2>Nothing found.</h2>
      )}
    </div>
  );
};

export default SearchResults;
