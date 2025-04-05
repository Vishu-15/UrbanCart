import './App.css'
import Home from './pages/Home/Home.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Login from './pages/Login/Login.jsx'
import About from './pages/About/About.jsx'
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Wishlist from './pages/Wishlist/Wishlist.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx'
import AdminLayout from './utils/AdminLayout.jsx'
import UserLayout from './utils/UserLayout.jsx'

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/products",
      element:<ProductsPage/>
    },
    {
      path:"/products/:productId",
      element:<ProductDetailsPage/>
    },
    // Protected User Routes (Only for Logged-in Users)
    {
      path: "/",
      element: <UserLayout />, // Ensures authentication before accessing these routes
      children: [
        { path: "profile", element: <Profile /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "my-orders", element: <MyOrders /> },
        { path: "cart", element: <Cart /> },
        { path: "placeOrder", element: <PlaceOrder /> },
      ],
    },
    {
      path: "/admin-panel",
      element: <AdminLayout/>, // Only allows access if user is admin
      children: [
        { index: true, element: <AdminPanel /> },
      ],
    },
    {
      path:"*",
      element:<NotFound/>
    },
  ])
  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
