import { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';
import { Person } from '../../types/types';
import styles from './Home.module.css';

type IProps = object;

type IState = {
  searchTerm: string;
  searchResults: Person[];
  hasError: boolean;
  isLoading: boolean;
};

class Home extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      hasError: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadSearchTermFromLocalStorage();
    this.fetchSearchResults();
  }

  loadSearchTermFromLocalStorage = () => {
    const storedTerm = localStorage.getItem('searchTerm');
    if (storedTerm) {
      this.setState({
        searchTerm: storedTerm.trim(),
        isLoading: true,
      });
    }
  };

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleSearch = () => {
    this.saveSearchTermToLocalStorage();
    this.fetchSearchResults();
  };

  saveSearchTermToLocalStorage = () => {
    localStorage.setItem('searchTerm', this.state.searchTerm.trim());
  };

  fetchSearchResults = async () => {
    this.setState({ isLoading: true });
    let url = 'https://swapi.dev/api/people/';
    if (this.state.searchTerm) {
      url += `?search=${encodeURIComponent(this.state.searchTerm)}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        hasError: false,
        searchTerm: this.state.searchTerm,
        searchResults: data.results,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Cannot fetch data');
    }
  };

  triggerError = (): void => {
    throw new Error('Test error');
  };

  componentDidUpdate(): void {
    if (this.state.hasError) {
      this.triggerError();
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <SearchBar
          searchTerm={this.state.searchTerm}
          onSearchInputChange={this.handleSearchInputChange}
          onSearch={this.handleSearch}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <SearchResults searchResults={this.state.searchResults} />
        )}
        <button
          className={styles.btnError}
          onClick={() =>
            this.setState({
              searchResults: [],
              searchTerm: '',
              hasError: true,
              isLoading: false,
            })
          }
        >
          Trigger Error
        </button>
      </div>
    );
  }
}

export default Home;
