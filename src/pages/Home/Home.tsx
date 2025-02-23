import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import { useGetPeopleQuery } from '../../redux/api';
import useSearch from '../../hooks/useSearch';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination/Pagination';
import SelectionFlyout from '../../components/SelectionFlyout/SelectionFlyout';

const Home: FC = () => {
  const [isShowError, setShowError] = useState<boolean>(false);
  const { searchTerm, updateSearchTerm } = useSearch();
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const { data, isLoading, isFetching, refetch } = useGetPeopleQuery({
    page: currentPage,
    searchTerm: searchTerm,
  });

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(event.target.value);
  };

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
    searchParams.set('page', '1');
    refetch();
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
    refetch();
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
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          data && <SearchResults searchResults={data.results} />
        )}
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={data?.count || 1}
        />
        <button className={styles.btnError} onClick={() => setShowError(true)}>
          Trigger Error
        </button>
        <SelectionFlyout />
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
