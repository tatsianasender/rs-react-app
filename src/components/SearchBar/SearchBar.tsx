import { ChangeEvent, Component } from 'react';
import styles from './SearchBar.module.css';

type IProps = {
  searchTerm: string;
  onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

type IState = object;

class SearchBar extends Component<IProps, IState> {
  render() {
    const { searchTerm, onSearchInputChange, onSearch } = this.props;

    return (
      <div className={styles.wrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchInputChange}
          placeholder="Enter name..."
        />
        <button className={styles.btn} onClick={onSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
