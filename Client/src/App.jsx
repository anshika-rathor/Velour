import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import Home from './pages/HomePage';
import Protected from './components/ProtectedRoute';
import ProductsPage from './pages/productPage';
import CartPage from './pages/cartPage';
import Settings from './pages/settingsPage';
import Layout from './components/Layout';
import WishListPage from './pages/wishlistPage';
function App() {
  return (
    <BrowserRouter>
    <Layout>
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
        <Route path = "/cart" element = {
          <Protected>
            <CartPage />
          </Protected>
        }/>
         <Route path = "/settings" element = {
          <Protected>
            <Settings />
          </Protected>
        }/>
        <Route path = "/wishlist" element = {
          <Protected>
            <WishListPage />
          </Protected>
        }/>
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;