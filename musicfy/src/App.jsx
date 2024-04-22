import { Routes, Route } from 'react-router-dom';
import Register from './assets/components/register';
import Login from './assets/components/login';
import Dashboard from './assets/components/dashboard';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

