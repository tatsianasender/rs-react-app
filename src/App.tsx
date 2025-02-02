import { Component } from 'react';
import Home from './pages/Home/Home';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    );
  }
}

export default App;
