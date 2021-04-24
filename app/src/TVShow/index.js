import React from 'react';
import Header from './Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

const Container = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Header />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Container;