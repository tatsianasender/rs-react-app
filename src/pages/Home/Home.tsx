import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import useSearch from '../../hooks/useSearch';
import { Person, PersonDetails } from '../../types/types';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination';
import Details from '../../components/Details';

const Home: FC = () => {
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowError, setShowError] = useState<boolean>(false);
  const { searchTerm, updateSearchTerm } = useSearch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [selectedPerson, setSelectedPerson] = useState<PersonDetails | null>(
    null
  );
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location]);

  useEffect(() => {
    fetchSearchResults(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const fetchSearchResults = async (term: string, page: number) => {
    setLoading(true);
    try {
      const query = term
        ? `?search=${term.trim()}&page=${page}`
        : `?page=${page}`;
      const response = await fetch(`https://swapi.dev/api/people/${query}`);
      const data = await response.json();
      setSearchResults(data.results || []);
      setTotalPage(data.count || 1);
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
    fetchSearchResults(term, 1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  const handleCardClick = async (url: string) => {
    setSelectedPerson(null);
    setDetailsLoading(true);

    try {
      const response = await fetch(url);
      const details = await response.json();
      setSelectedPerson(details);

      searchParams.set('details', url.split('/').slice(-2, -1)[0]);
      setSearchParams(searchParams);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setDetailsLoading(false);
    }
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
    <div
      className={cn(styles.wrapper, {
        [styles.withDetails]: selectedPerson,
      })}
    >
      <div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchInputChange={handleSearchInputChange}
          onSearch={handleSearch}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <SearchResults
            searchResults={searchResults}
            onCardClick={handleCardClick}
          />
        )}
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPage}
        />
        <button className={styles.btnError} onClick={() => setShowError(true)}>
          Trigger Error
        </button>
      </div>
      {selectedPerson && (
        <div className={styles.details}>
          {detailsLoading ? <Loader /> : <Details person={selectedPerson} />}
          <button onClick={() => setSelectedPerson(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Home;
