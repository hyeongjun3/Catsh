import CheatLayout from "@Components/layout/CheatLayout";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CheatLayout>
        <Router />
      </CheatLayout>
    </QueryClientProvider>
  );
}

export default App;
