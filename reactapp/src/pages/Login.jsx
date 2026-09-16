import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import { loginApi } from '../services/authApi';
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
      navigate("/");
    }
    catch(error){
      console.error(error);
    }
  }


  return (
    <main className='main-content'>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Input name="email" value={form.email} label="Email:" onChange={handleChange} placeholder="Enter email" type='email'></Input>
          <Input name="password" value={form.password} label="Password:" onChange={handleChange} placeholder="******" type='password'></Input>
          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login
