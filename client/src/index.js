import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import AuthProvider from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
