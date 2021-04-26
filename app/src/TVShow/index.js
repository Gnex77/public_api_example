import React from 'react';
import Header from './Header';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import Content from './Content';

const queryClient = new QueryClient();

const Container = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Header />
        <Content />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default Container;