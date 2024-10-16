import { Outlet } from "react-router-dom"
import "./index.css"

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;