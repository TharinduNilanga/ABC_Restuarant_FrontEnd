import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './components/Register/Register';
import Login from './components/Login/Login';

import AdminDashboard from './components/Admin/Dashboard';
import AdminUsers from './components/Admin/Users/Users'
import AdminAddUsers from './components/Admin/Users/AddUser'
import AdminEditUsers from './components/Admin/Users/EditUser'
import AdminRestaurants from './components/Admin/Restaurants/Restaurants'
import AdminAddRestaurants from './components/Admin/Restaurants/AddRestaurent'
import AdminEditRestaurants from './components/Admin/Restaurants/EditRestaurent'
import AdminProductCategory from './components/Admin/ProductCategory/ProductCategory'
import AdminAddProductCategory from './components/Admin/ProductCategory/AddProductCategory'
import AdminEditProductCategory from './components/Admin/ProductCategory/EditProductCategory'
import AdminProduct from './components/Admin/Product/Products'
import AdminAddProduct from './components/Admin/Product/AddProduct'
import AdminEditProduct from './components/Admin/Product/EditProduct'
import AdminOffers from './components/Admin/Offer/Offers'
import AdminAddOffer from './components/Admin/Offer/AddOffer'
import AdminEditOffer from './components/Admin/Offer/EditOffer'
import AdminFacilities from './components/Admin/Facility/Facilities'
import AdminAdFacility from './components/Admin/Facility/AddFacility'
import AdminEdiFacility from './components/Admin/Facility/EditFacility'
import AdminReservations from './components/Admin/Reservation/Reservations'
import AdminReservationDetails from './components/Admin/Reservation/Details'
import AdminCheckout from './components/Admin/Reservation/Checkout'
import AdminQueries from './components/Admin/Query/Queries'
import AdminChat from './components/Admin/Query/Chat'
import AdminGallery from './components/Admin/Gallery/Gallery'
import AdminAdGallery from './components/Admin/Gallery/AddGallery'
import AdminEdiGallery from './components/Admin/Gallery/EditGallery'
import Profile from './components/Admin/Profile/profile'
import EditDetails from './components/Admin/Profile/EditDetails'
import ChangePassword from './components/Admin/Profile/ChangePassword'

import StaffDashboard from './components/Staff/Dashboard';
import StaffProducts from './components/Staff/Products/Products';
import StaffOffers from './components/Staff/Offer/Offers';
import StaffFacilities from './components/Staff/Facility/Facilities';
import StaffReservations from './components/Staff/Reservation/Reservations';
import StaffReservationDetails from './components/Staff/Reservation/Details';
import StaffCheckout from './components/Staff/Reservation/Checkout';
import StaffQueries from './components/Staff/Query/Queries';
import StaffChat from './components/Staff/Query/Chat';
import StaffProfile from './components/Staff/Profile/Profile'
import StaffChangePassowrd from './components/Staff/Profile/ChangePassword'

import CustomerDashboard from './components/Customer/Dashboard';
import CustomerMenu from './components/Customer/Menu/Products';
import CustomerOffers from './components/Customer/Offers/Offers';
import CustomerChat from './components/Customer/Queries/Chat';
import CustomerCart from './components/Customer/Cart/Cart';
import CustomerCheckout from './components/Customer/Cart/Checkout';
import CustomerProfile from './components/Customer/Profile/profile';
import CustomerEditDetails from './components/Customer/Profile/EditDetails';
import CustomerChangePassword from './components/Customer/Profile/ChangePassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/restaurants' element={<AdminRestaurants />} />
      <Route path='/admin/addRestaurants' element={<AdminAddRestaurants />} />
      <Route path='/admin/editRestaurants' element={<AdminEditRestaurants />} />
      <Route path='/admin/users' element={<AdminUsers />} />
      <Route path='/admin/addUsers' element={<AdminAddUsers />} />
      <Route path='/admin/editUsers' element={<AdminEditUsers />} />
      <Route path='/admin/productCategory' element={<AdminProductCategory />} />
      <Route path='/admin/addProductCategory' element={<AdminAddProductCategory />} />
      <Route path='/admin/editProductCategory' element={<AdminEditProductCategory />} />
      <Route path='/admin/products' element={<AdminProduct />} />
      <Route path='/admin/addProduct' element={<AdminAddProduct />} />
      <Route path='/admin/editProduct' element={<AdminEditProduct />} />
      <Route path='/admin/offers' element={<AdminOffers />} />
      <Route path='/admin/addOffer' element={<AdminAddOffer />} />
      <Route path='/admin/editOffer' element={<AdminEditOffer />} />
      <Route path='/admin/facilities' element={<AdminFacilities />} />
      <Route path='/admin/addfacility' element={<AdminAdFacility />} />
      <Route path='/admin/editfacility' element={<AdminEdiFacility />} />
      <Route path='/admin/reservations' element={<AdminReservations />} />
      <Route path='/admin/reservation/details' element={<AdminReservationDetails />} />
      <Route path='/admin/reservation/checkout' element={<AdminCheckout />} />
      <Route path='/admin/queries' element={<AdminQueries />} />
      <Route path='/admin/chat' element={<AdminChat />} />
      <Route path='/admin/gallery' element={<AdminGallery />} />
      <Route path='/admin/addgallery' element={<AdminAdGallery />} />
      <Route path='/admin/editgallery' element={<AdminEdiGallery />} />
      <Route path='/admin/profile' element={<Profile />} />
      <Route path='/admin/editProfile' element={<EditDetails />} />
      <Route path='/admin/changePassword' element={<ChangePassword />} />

      <Route path='/staff/dashboard' element={<StaffDashboard />} />
      <Route path='/staff/products' element={<StaffProducts />} />
      <Route path='/staff/offers' element={<StaffOffers />} />
      <Route path='/staff/facilities' element={<StaffFacilities />} />
      <Route path='/staff/reservations' element={<StaffReservations />} />
      <Route path='/staff/reservation/details' element={<StaffReservationDetails />} />
      <Route path='/staff/reservation/checkout' element={<StaffCheckout />} />
      <Route path='/staff/queries' element={<StaffQueries />} />
      <Route path='/staff/chat' element={<StaffChat />} />
      <Route path='/staff/profile' element={<StaffProfile />} />
      <Route path='/staff/changePassword' element={<StaffChangePassowrd />} />

      <Route path='/user/dashboard' element={<CustomerDashboard />} />
      <Route path='/user/menu' element={<CustomerMenu />} />
      <Route path='/user/offers' element={<CustomerOffers />} />
      <Route path='/user/chat' element={<CustomerChat />} />
      <Route path='/user/cart' element={<CustomerCart />} />
      <Route path='/user/checkout' element={<CustomerCheckout />} />
      <Route path='/user/profile' element={<CustomerProfile />} />
      <Route path='/user/editDetails' element={<CustomerEditDetails />} />
      <Route path='/user/changePassword' element={<CustomerChangePassword />} />
      
    </Routes>
  </BrowserRouter>
);