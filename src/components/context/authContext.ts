import React, { createContext } from "react";

type User = {
  token: string;
};

// Define the type for your context value
type AuthContextType = {
  readonly user: User | null; // Replace 'User' with your user type
  readonly setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
});

export default AuthContext;
