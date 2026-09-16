import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import { loginApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const Login = () => {

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      // console.log(form);
      const res = await loginApi(form);
      // localStorage.setItem("token",res.data.token);
      // console.log(res.data.token);
      login(res.data.token,form.email);
      navigate("/AddjobApplication");
    }
    catch(error){
      console.error(error);
    }
  }


  return (
    <div className='min-h-screen items-center justify-center px-6 flex flex-col'>
      <div>
        <h1 className='text-4xl font-semibold text-center mb-6 mt-6'>Login</h1>
      </div>
      <div className='w-full max-w-md  rounded-md shadow-sm'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input name="email" value={form.email} label="Email:" onChange={handleChange} placeholder="Enter email" type='email'></Input>
          <Input name="password" value={form.password} label="Password:" onChange={handleChange} placeholder="******" type='password'></Input>
          <button type='submit' className='w-full bg-black text-white py-2 px-4 rounded-md font-medium hover:font-bold transition duration-500 cursor-pointer'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
