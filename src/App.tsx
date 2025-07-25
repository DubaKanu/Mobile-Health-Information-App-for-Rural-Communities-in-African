import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FirstAidPage from './pages/FirstAidPage';
import HygienePage from './pages/HygienePage';
import RemindersPage from './pages/RemindersPage';
import EmergencyPage from './pages/EmergencyPage';
import EducationPage from './pages/EducationPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HospitalsPage from './pages/HospitalsPage';
import HospitalDetailsPage from './pages/HospitalDetailsPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import AppointmentsPage from './pages/AppointmentsPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <AppointmentProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<ProtectedRoute>
                  <Layout />
                </ProtectedRoute>}>
              <Route index element={<HomePage />} />
              <Route path="first-aid" element={<FirstAidPage />} />
              <Route path="hygiene" element={<HygienePage />} />
              <Route path="reminders" element={<RemindersPage />} />
              <Route path="emergency" element={<EmergencyPage />} />
              <Route path="education" element={<EducationPage />} />
              <Route path="hospitals" element={<HospitalsPage />} />
              <Route path="hospitals/:hospitalId" element={<HospitalDetailsPage />} />
              <Route path="book-appointment/:hospitalId/:departmentId/:doctorId" element={<BookAppointmentPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
            </Route>
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppointmentProvider>
      </AuthProvider>
    </BrowserRouter>;
}