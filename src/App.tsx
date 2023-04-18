import { Suspense } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import { CustomSkeleton } from 'components/common';
import { router } from 'router';
import GlobalStyle, { theme } from 'styles';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000, suspense: true } },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<CustomSkeleton />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
          <GlobalStyle />
        </QueryClientProvider>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
