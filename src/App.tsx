import * as React from 'react';
import AOS from "aos";

import Home from 'src/pages/Home';
import { ThemeProvider } from 'styled-components';
import { device } from 'src/theme/breakpoints';

const App = () => {
  React.useEffect(() => {
    AOS.init({
      once: true
    });
    AOS.refresh();
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100)
  }, []);
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
