import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VenueDetails from "./pages/VenueDetails";
import Profile from "./pages/Profile";
import CreateVenue from "./pages/CreateVenue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/venues/:id' element={<VenueDetails />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create' element={<CreateVenue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
