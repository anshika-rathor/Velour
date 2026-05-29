import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import Home from './pages/HomePage';
import Protected from './components/ProtectedRoute';
import ProductsPage from './pages/productPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login"  element = {<Login />} />
        <Route path = "/signup"  element = {<Signup />} />
        <Route path = "/"  element = {
        <Protected>
        <Home /> 
        </Protected>
        }/>
        <Route path = "/products" element = {
          <Protected>
            <ProductsPage />
          </Protected>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;