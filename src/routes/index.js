// FalconRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Products from 'components/app/e-commerce/product/Products';
import ProductDetails from 'components/app/e-commerce/product/product-details/ProductDetails';
import ShoppingCart from 'components/app/e-commerce/cart/ShoppingCart';
import Billing from 'components/app/e-commerce/billing/Billing';
import Checkout from 'components/app/e-commerce/checkout/Checkout';
import Invoice from 'components/app/e-commerce/Invoice';
import SimpleLogin from 'components/authentication/simple/Login';
import SimpleRegistration from 'components/authentication/simple/Registration';
import SimpleForgetPassword from 'components/authentication/simple/ForgetPassword';
import Map from 'components/home/componentsHome/Map/map';
import Home from 'components/home';
import CategoryProducts from 'components/home/componentsHome/CategoryProductsComponents/CategoryProducts';
import PrivateRoute from 'routes/PrivateRoute';
import SimpleLogout from 'components/authentication/simple/Logout';
import AuthSimpleLayout from '../layouts/AuthSimpleLayout';
import Tramites from 'components/home/componentsHome/CategoryGroupComponents/Tramites'; // Importa el nuevo componente Tramites

const FalconRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Rutas principales del dashboard */}
        <Route path="/" element={<Home />} />
        {/* Rutas para el ecommerce */}
        <Route path="/home" element={<Home />} />
        <Route path="e-commerce/shopping-cart" element={<ShoppingCart />} />
        <Route path="e-commerce/product/:productLayout" element={<Products />} />
        <Route path="e-commerce/product/product-details/:productId" element={<ProductDetails />} />
        <Route path="e-commerce/billing" element={<Billing />} />
        <Route path="e-commerce/checkout" element={<PrivateRoute element={Checkout} />} />
        <Route path="e-commerce/invoice" element={<Invoice />} />
        
        {/* Ruta específica para "Trámites" */}
        <Route path="/category/Trámites" element={<Tramites />} />
        
        {/* Ruta genérica para otras categorías */}
        <Route path="/category/:category" element={<CategoryProducts />} />

      </Route>

      {/* Rutas de autenticación */}
      <Route element={<AuthSimpleLayout />}>
        <Route path="authentication/simple/login" element={<SimpleLogin />} />
        <Route path="authentication/simple/register" element={<SimpleRegistration />} />
        <Route path="authentication/simple/logout" element={<SimpleLogout />} />
        <Route path="authentication/simple/forgot-password" element={<SimpleForgetPassword />} />
      </Route>

      {/* Rutas de usuario, mapas y utilidades */}
      <Route path="components/home/componentsHome/map" element={<Map />} />

      {/* Redirección en caso de error 404 */}
      <Route path="*" element={<Navigate to="/errors/404" replace />} />
    </Routes>
  );
};

export default FalconRoutes;
