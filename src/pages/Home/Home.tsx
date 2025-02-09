import { ChangeEvent, FC, useEffect, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import { Person } from '../../types/types';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';
import styles from './Home.module.css';

const Home: FC = () => {
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowError, setShowError] = useState<boolean>(false);
  const { searchTerm, updateSearchTerm } = useSearch();

  useEffect(() => {
    fetchSearchResults(searchTerm);
  }, [searchTerm]);

  const fetchSearchResults = async (term: string) => {
    setLoading(true);
    try {
      const query = term ? `?search=${term.trim()}` : '';
      const response = await fetch(`https://swapi.dev/api/people/${query}`);
      const data = await response.json();
      setSearchResults(data.results || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(event.target.value);
  };

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
    fetchSearchResults(term);
  };

  useEffect(() => {
    if (isShowError) {
      triggerError();
    }
  }, [isShowError]);

  const triggerError = (): void => {
    throw new Error('Test error');
  };

  return (
    <div className={styles.wrapper}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchInputChange={handleSearchInputChange}
        onSearch={handleSearch}
      />
      {isLoading ? <Loader /> : <SearchResults searchResults={searchResults} />}
      <button className={styles.btnError} onClick={() => setShowError(true)}>
        Trigger Error
      </button>
    </div>
  );
};

export default Home;
