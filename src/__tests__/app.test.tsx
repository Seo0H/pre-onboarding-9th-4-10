import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import App from 'App';
import MainPage from 'pages/MainPage';

jest.mock('utils/api/index');

describe('About Initial Rendering', () => {
  it('App Skeleton is working', () => {
    render(<App />);
    const sceleton = screen.getAllByRole('region');
    expect(sceleton).toBeInTheDocument;
  });
  it('Table-Container is rendered', () => {
    setup();
    const testId = screen.findByTestId('Table-Container');
    expect(testId).toBeInTheDocument;
  });
});

function setup() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>,
  );
}
