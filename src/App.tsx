import React from 'react';

import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
