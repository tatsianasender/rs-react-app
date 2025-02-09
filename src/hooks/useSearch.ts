import { useState, useEffect } from 'react';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
    localStorage.setItem('searchTerm', term);
  };

  return { searchTerm, updateSearchTerm };
};

export default useSearch;
