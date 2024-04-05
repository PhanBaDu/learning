import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import PrivateAuth from './components/PrivateAuth';
import Profile from './pages/Profile';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateAuth />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
