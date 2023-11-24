import Home from 'src/pages/Home';
import { ThemeProvider } from 'styled-components';
import { device } from 'src/theme/breakpoints';

const App = () => {
  return (
    <ThemeProvider
      theme={{
        ...device
      }}
    >
      <Home />
    </ThemeProvider>
  );
};

export default App
