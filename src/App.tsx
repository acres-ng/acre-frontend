// App.js
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routings from "./components/routes/Routings";
import AuthContext from "./components/context/authContext";

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

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routings />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
