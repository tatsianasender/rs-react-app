import { FC } from 'react';
import { useTheme } from './ThemeContext';
import Home from './pages/Home/Home';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Details from './components/Details';

const App: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className={theme}>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <button className="btn_theme" onClick={toggleTheme}>
            Theme {theme}
          </button>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
