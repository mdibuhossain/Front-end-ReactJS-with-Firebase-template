import './App.css';
import Navigation from './components/Navigation';
import Register from './components/Register/Register';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PageNotFound from './components/PageNotFound/PageNotFound';
import RequireAuth from './components/ProtectedRoute/RequireAuth';
import Home from './components/Home/Home';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import AddProduct from './components/Dashboard/AddProduct';
import ManageProducts from './components/Dashboard/ManageProducts';
import ManageOrders from './components/Dashboard/ManageOrders';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/home" element={
            <>
              <Navigation />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navigation />
              <Login />
              <Footer />
            </>
          } />
          <Route path="/register" element={
            <>
              <Navigation />
              <Register />
              <Footer />
            </>
          } />
          <Route path="/dashboard" element={<RequireAuth>
            <Dashboard />
          </RequireAuth>}>
            <Route path="/dashboard" element={<ManageOrders />} />
            <Route path="/dashboard/manageproducts" element={<ManageProducts />} />
            <Route path="/dashboard/addproduct" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
