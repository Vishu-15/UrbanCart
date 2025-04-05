import { useState} from 'react';
import './Signup.css'
import AuthImg from '../../components/AuthImg/AuthImg.jsx'
import Layout from '../../components/Layout/Layout.jsx'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

export default function Signup(){
    const navigate = useNavigate();

    let [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    });

    let handleInputChange = (e)=>{
        let fieldName = e.target.name;
        let value = e.target.value;
        setFormData((currData)=>{
            currData[fieldName] = value;
            return {...currData};
        })
    }

    const submitForm = async (event)=>{
        event.preventDefault();
        try {
            const response = await axios.post('https://urbancart-backend-5jg9.onrender.com/api/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, //Important for cookies/auth
            });
            console.log(response);
            toast('Signed Up Successfully!');
            navigate('/login');
        } catch (error) {
            console.error('Error adding user:', error.response?.data || error.message);
            toast('Some Error Occured while Signing Up!');
        }
    }
    

    return (
        <Layout title="UrbanCarts-SignUp">
            <div className="signup-page">
                <AuthImg/>
                <div className="signup-box">
                    <h3 className='heading'>Create Your Account</h3>
                    <div>Enter your details below</div>
                    <form action="" onSubmit={submitForm}>
                        <div className="inputs">
                            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} required/>
                            <input type="email" placeholder='Email' name="email" value={formData.email} onChange={handleInputChange} required/>
                            <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleInputChange} required/>
                        </div>
                        <button className='signup-btn'>Create Account</button>
                        <button className='signup-google-btn'>Sign Up with Google</button>
                        <div className='already-registered'>Already registered ? <Link to="/login">Login</Link></div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}