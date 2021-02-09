import React, {createContext, useCallback, useState} from 'react'
import api from "../services/api";


interface AuthState {
  token: string;
}

interface SignInCredencials {
  email: string;
  password: string
}

interface AuthContextData {
  token: string

  signIn(credencials: SignInCredencials): Promise<void>
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    if (token) {
      return {token};
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({email, password}) => {
    console.log(email);
    console.log(password);

    const response = await api.post('User/Authenticate'
      , {UserName: email, Password: password}
    );

    const {token} = response.data

    localStorage.setItem('@GoBarber:token', token);

    console.log(response.data);
    setData({token})

  }, []);

  return (
    <AuthContext.Provider value={{token: data.token, signIn}}>
      {children}
    </AuthContext.Provider>);
};


export {AuthContext, AuthProvider}
