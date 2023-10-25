// App.js
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import PublicRoutes from "./components/routes/PublicRoutes";
import AuthContext from "./components/context/authContext";
import Layout from "./components/common/Layout";
import auth from "./services/authService";

type User = {
  token: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const loginUser = auth.getCurrentUser();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>{loginUser ? <Layout /> : <PublicRoutes />}</Router>
    </AuthContext.Provider>
  );
}

export default App;
