import React, { createContext } from "react";

interface User {
  token: string;
  customer: {
    profile_id: string;
    id: string;
    firstname: string;
    email: string;
    phone: string;
  };
  farms: {
    id: string;
    name: string;
  }[];
}

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
