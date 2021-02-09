import React  from 'react';
import GlobalStyle from './style/global'
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

import {AuthContext, AuthProvider} from "./context/AuthContext";

const App: React.FC = () => {

  return (
    <>
      <AuthProvider>
        <SignIn/>
      </AuthProvider>

      <GlobalStyle/>
    </>
  );
}


export default App;
