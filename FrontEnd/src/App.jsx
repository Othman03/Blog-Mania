import BlogDetails from "./pages/BlogDetails";
import Create from "./pages/Create";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ErrorPage from "./pages/ErrorPage";
import BlogEdit from "./pages/BlogEdit";
import TestPage from "./pages/TestPage";
import LandingPage from "./pages/landingPage";
import Login from "./components/Login";
import Register from "./components/register";
import Authenticator from "./components/Authenticator";

function App({ setLoggedIn }) {
  return (
    <BrowserRouter>
      <div className="App"></div>

      <div className="content"> </div>
      <div className="w-screen bg-red-500">
        <Navbar setLoggedIn={setLoggedIn} />
      </div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        <Route exact path="/register" element={<Register />} />

        <Route exact path="/login" element={<Login />} />

        <Route element={<Authenticator />}>
          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route path="/create" element={<Create />} />

          <Route path="/blogs/:id" element={<BlogDetails />} />

          <Route path="/edit/:id" element={<BlogEdit />} />

          <Route path="/test" element={<TestPage />} />
        </Route>

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
