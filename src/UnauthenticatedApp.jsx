import { Routes, Route } from "react-router-dom";
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';

function UnauthenticatedApp() {
    return (
        <>
            <Home />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register/developer' element={<Register role={'developer'} />} />
                <Route path='/register/advertiser' element={<Register role={'reklomadatel'} />} />
            </Routes>
        </>
    );
}

export default UnauthenticatedApp;