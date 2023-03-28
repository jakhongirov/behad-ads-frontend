import React from 'react';
import './App.scss';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
import Redirect from './components/redirect/redirect';
import useToken from './Hooks/useToken';

function App() {
  const [token] = useToken();

  if (token) {
    return (
      <>
        <AuthenticatedApp />
        <Redirect />
      </>
    );
  } else {
    return <UnauthenticatedApp />;
  }

}

export default App;