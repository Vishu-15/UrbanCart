import { useState} from 'react';
import axios from 'axios';
import './Login.css'
import AuthImg from '../../components/AuthImg/AuthImg.jsx'
import Layout from '../../components/Layout/Layout.jsx'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';

export default function Login(){
    const navigate = useNavigate();
    let [formData,setFormData] = useState({
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
        console.log(formData);
        event.preventDefault();
        try {
            const response = await axios.post('https://urbancart-backend-5jg9.onrender.com/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if(response){
                localStorage.setItem('urbancart-user',response.data.user.email);
                console.log('Login successful:', response.data);
                toast("Logged In Successfully!");
                navigate('/'); 
            }
        } 
        catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            toast('Invalid email or password'); // Provide user feedback
        }
    }
    

    return (
        <Layout title="UrbanCarts-Login">
            <div className="login-page">
                <AuthImg/>
                <div className="login-box">
                    <h3 className='heading'>Login to UrbanCarts</h3>
                    <div>Enter your details below</div>
                    <form action="" onSubmit={submitForm}>
                        <div className="inputs">
                            <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required/>
                            <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleInputChange} required/>
                        </div>
                        <button className='login-btn'>Login</button>
                        {/* <div className='forgot-pass'><Link to="/login">Forgot Password</Link></div> */}
                    </form>
                </div>
            </div>
        </Layout>
    )
}