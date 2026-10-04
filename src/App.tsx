/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RestaurantProvider } from './context/RestaurantContext';
import { PublicHomePage } from './pages/PublicHomePage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <RestaurantProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Restaurant Routes */}
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/menu" element={<PublicHomePage initialScrollSection="menu" />} />
          <Route path="/reservas" element={<PublicHomePage initialScrollSection="reservas" />} />
          <Route path="/eventos" element={<PublicHomePage initialScrollSection="eventos" />} />
          <Route path="/galeria" element={<PublicHomePage initialScrollSection="galeria" />} />
          <Route path="/contactos" element={<PublicHomePage initialScrollSection="localizacao" />} />

          {/* Dedicated Protected Admin Route (Never shown in public navigation) */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RestaurantProvider>
  );
}
