import { Component } from 'react';
import Card from '../Card';
import { Person } from '../../types/types';
import styles from './SearchResults.module.css';

type IProps = {
  searchResults: Person[];
};

type IState = object;

class SearchResults extends Component<IProps, IState> {
  render() {
    const { searchResults } = this.props;

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
  }
}

export default SearchResults;
