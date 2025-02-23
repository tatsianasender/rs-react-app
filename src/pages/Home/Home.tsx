import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import useSearch from '../../hooks/useSearch';
import { Person } from '../../types/types';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination';

const Home: FC = () => {
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowError, setShowError] = useState<boolean>(false);
  const { searchTerm, updateSearchTerm } = useSearch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location]);

  useEffect(() => {
    setDetailsOpen(location.pathname.startsWith('/details/'));
  }, [location.pathname]);

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

  const handleClickOutside = () => {
    if (isDetailsOpen) {
      navigate('/');
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
        [styles.withDetails]: isDetailsOpen,
      })}
      onClick={handleClickOutside}
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
          <SearchResults searchResults={searchResults} />
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
      {isDetailsOpen && (
        <div className={styles.details}>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Home;
