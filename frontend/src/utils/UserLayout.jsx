import { Outlet,Navigate } from "react-router-dom";

const UserLayout = ()=>{
    const storedUser = localStorage.getItem('urbancart-user');
    return storedUser ? <Outlet/> : <Navigate to='/login'/>;
}

export default UserLayout;