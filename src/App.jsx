import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import StandardPhotoPrint from './pages/StandardPhotoPrint';
import StandardPhotoUpload from './pages/StandardPhotoUpload';
import Checkout from './pages/Checkout';
import AdminHome from './pages/admin/AdminHome';
import ManageOrders from './pages/admin/ManageOrders';
import Newborn from './pages/Newborn';
import KidsPhotography from './pages/KidsPhotography';
import FamilySession from './pages/FamilySession';
import Maternity from './pages/Maternity';
import CakeSmash from './pages/CakeSmash';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/standard-photo-print" element={<StandardPhotoPrint />} />
      <Route path="/image/upload" element={<StandardPhotoUpload />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/newborn" element={<Newborn />} />
      <Route path="/kids-photography" element={<KidsPhotography />} />
      <Route path="/family-session" element={<FamilySession />} />
      <Route path="/maternity" element={<Maternity />} />
      <Route path="/cake-smash" element={<CakeSmash />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin Routes */}
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/manageOrders" element={<ManageOrders />} />

      {/* block unwanted routing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
