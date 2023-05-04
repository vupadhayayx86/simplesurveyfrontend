import React, { FormEvent } from 'react'
import {useForm,SubmitHandler} from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"


interface Props{
    username:String,
    email:String,
    password:String,
    confirmpass:String
}

const SurveyForm = () => {
    const {register,handleSubmit,formState:{errors},reset} =useForm<Props>()
    

    const handleGet=(e:FormEvent)=>{
      e.preventDefault()
      axios.get("https://backendsurvey.onrender.com/users",{withCredentials:true})
      .then(res=>console.log(res))
      .catch(error=>console.log(error))
    }
    

    const onFormSubmit=async (data:Props)=>{
      console.log(data)
      if(data.password!==data.confirmpass){
        toast("Password do not match")
        return
      }
      
      const response=await fetch("https://backendsurvey.onrender.com/users",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        credentials: 'include',
        body:JSON.stringify(data)
      })

      const json=await response.json()
      if(!response.ok){
        console.log("Something went wrong in form submission",json)
      }
      if(response.ok){
        console.log("User created Successfully",json)
        reset()
      }
    }

    const resetForm=(e:FormEvent)=>{
      e.preventDefault()
      reset()
    }

  return (
    <form onSubmit={handleSubmit((data)=>onFormSubmit(data))}>
        <label htmlFor="username">Username</label>
        <input type="text" className='form-control w-25' id='username' {...register("username",{required:true})} />
        {errors.username && <p className='text-danger'>Field cannot be empty.</p>}
        <label htmlFor="email">Email</label>
        <input type="email" className='form-control w-25' id='email' {...register("email", {required:true})} />
        {errors.email && <p className='text-danger'>Field cannot be empty.</p>}
        <label htmlFor="password">Password</label>
        <input type="password" className='form-control w-25' id='password' {...register("password",{required:true})} />
        {errors.password && <p className='text-danger'>Field cannot be empty.</p>}
        <label htmlFor="confirmpass">Confirm Password</label>
        <input type="password" id="confirmpass" className='form-control w-25' {...register("confirmpass",{required:true})} />
        {errors.confirmpass && <p className='text-danger'>Field cannot be empty.</p>}
        <ToastContainer />
        <button className="btn btn-primary" type='submit'>Submit</button>
        <button className="btn btn-danger m-3" onClick={(e)=>resetForm(e)}>Clear</button>
        <button className="btn btn-danger m-3" onClick={(e)=>handleGet(e)}>Get Cookies</button>
        
    </form>
  )
}

export default SurveyForm