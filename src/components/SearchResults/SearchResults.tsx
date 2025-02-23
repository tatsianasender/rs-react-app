import { FC } from 'react';
import Card from '../Card';
import { Person } from '../../types/types';
import styles from './SearchResults.module.css';

type IProps = {
  searchResults: Person[];
};

const SearchResults: FC<IProps> = ({ searchResults }) => {
  return (
    <div className={styles.wrapper}>
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Card key={index} person={result} />
        ))
      ) : (
        <h2>Nothing found.</h2>
      )}
    </div>
  );
};

export default SearchResults;
