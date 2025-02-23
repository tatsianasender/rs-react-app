import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

interface IState {
  error: null | Error;
  hasError: boolean;
  errorInfo: null | React.ErrorInfo;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.error}>Error</div>
          <div>
            You clicked a button to throw an error or something went wrong
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
