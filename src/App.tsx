import CheatLayout from "@Components/layout/CheatLayout";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SentryBoundary from "@Components/boundary/SentryBoundary";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <SentryBoundary>
      <QueryClientProvider client={queryClient}>
        <CheatLayout>
          <Router />
        </CheatLayout>
      </QueryClientProvider>
    </SentryBoundary>
  );
}

export default App;
