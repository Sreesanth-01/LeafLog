import React, { useState } from 'react'
import { registerUser } from '../api/authApi';
import Input from '../components/Input';

const Register = () => {

  const [form,setForm] = useState({
    userName:"",
    email:"",
    mobile:"",
    password:""
  });

  const handleChange = (e)=>{
    setForm({...form , [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await registerUser(form);
      console.log("Registration successfull");
    }
    catch(error){
      console.error("Registration error");
    }

  }

  return (
    <div>
      <div>
        <h1>Register</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
            <Input label="UserName" name="userName" value={form.userName} type="text" onChange={handleChange} placeholder="Enter Username"></Input>
            <Input label="Email" name="email" value={form.email} type="email" onChange={handleChange} placeholder="you@example.com"></Input>
            <Input label="Mobile" name="mobile" value={form.mobile} type="text" onChange={handleChange} placeholder="Your mobile no."></Input>
            <Input label="Password" name="password" value={form.password} type="password" onChange={handleChange} placeholder="Enter Password"></Input>
            <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
