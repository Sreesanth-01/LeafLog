import React, { useState } from 'react'
import { registerUser } from '../services/authApi';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

  const [form,setForm] = useState({
    userName:"",
    email:"",
    password:""
  });

  const handleChange = (e)=>{
    setForm({...form , [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await registerUser(form);
      navigate("/login");
      console.log("Registration successfull");
    }
    catch(error){
      console.error("Registration error");
    }

  }

  return (
    <main className='main-content'>
        <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
            <Input label="UserName" name="userName" value={form.userName} type="text" onChange={handleChange} placeholder="Enter Username"></Input>
            <Input label="Email" name="email" value={form.email} type="email" onChange={handleChange} placeholder="you@example.com"></Input>
            <Input label="Password" name="password" value={form.password} type="password" onChange={handleChange} placeholder="Enter Password"></Input>
            <button type='submit'>Register</button>
        </form>
      </div>
    </main>
  )
}

export default Register
