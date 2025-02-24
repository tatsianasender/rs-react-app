import { ChangeEvent, FC, useState } from 'react';
import styles from './SearchBar.module.css';

type IProps = {
  searchTerm: string;
  onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (term: string) => void;
};

const SearchBar: FC<IProps> = ({ searchTerm, onSearch }) => {
  const [term, setTerm] = useState<string>(searchTerm);

  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value.trim())}
        placeholder="Enter name..."
      />
      <button className={styles.btn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
