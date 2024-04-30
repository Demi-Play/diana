import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './App.css';
import './index.css'
import CreateCarForm from './components/Cars/CreateCarForm';
import CarList from './components/Cars/CardList';
import Brands from './components/Brands/Brands';
import AddBrand from './components/Brands/AddBrand';
import EditBrand from './components/Brands/EditBrand';
import Favorites from './components/Favorites';
import Wrapper from './components/UI/Wrapper';
import Provider from './components/Login/Provider';
import CarEdit from './components/Cars/CarEdit';
import UserView from './components/UserView'

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Provider />} />
      <Route path="/:userId/catalog" element={
        <Wrapper>
          <CarList />
        </Wrapper>
      } />
      <Route path="/:userId/create-car" element={
        <Wrapper>
          <CreateCarForm />
        </Wrapper>
      } />
      <Route path="/:userId/edit-car/:id" element={
        <Wrapper>
          <CarEdit />
        </Wrapper>
      } />
      <Route path="/:userId/brands" element={
        <Wrapper>
          <Brands />
        </Wrapper>
      } />
      <Route path="/:userId/add-brand" element={
        <Wrapper>
          <AddBrand />
        </Wrapper>
      } />
      <Route path="/:userId/edit-brand/:id" element={   // Dynamic route with parameter ":id"
        <Wrapper>
          <EditBrand />
        </Wrapper>
      } />
      <Route path="/:userId/favorites" element={  // Dynamic route with parameter ":userId"
        <Wrapper>
          <Favorites />
        </Wrapper>
      } />
      <Route path="/:userId/users" element={  // Dynamic route with parameter ":userId"
        <Wrapper>
          <UserView />
        </Wrapper>
      } />
    </Routes>
  </Router>
);
