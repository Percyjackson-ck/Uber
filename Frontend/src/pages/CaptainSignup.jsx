import React, { useState } from 'react'
import Uber_logo from '../images/Uber_logo_.png'
import { Link } from 'react-router-dom'
import { useCaptain } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {



  const navigate=useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useCaptain();


  const submitHandler = async(e) => {
    e.preventDefault();


    const captainData={
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    }
    const respone=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
    // console.log(respone);
    
    if(respone.status==201){
      const data=respone.data;
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleCapacity('')
    setVehicleCapacity('');
    setVehicleType('')
    setVehicleColor('');
  }

  return (
    <div className='pl-3.5 pr-3.5 pt-0 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-2' src="data:image/png;base64,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" alt="" />

        <form onSubmit={submitHandler}>


          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              placeholder='First name' />
            <input
              className='bg-[#eeee]  w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              placeholder='Last name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            className='bg-[#eeee] mb-5  w-full rounded px-4 py-2 border  text-lg placeholder:text-base'
            type="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            value={email}
            placeholder='Enter your email' />

          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input
            className='bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder='Enter your password' />


<h3 className='text-lg font-medium mb-2'>Vehicle information</h3>
<div className='flex flex-wrap gap-4 mb-5 w-full'>
  <div className='w-[47%]'>
    <input
      className='bg-[#eeee] w-full rounded px-4 py-2 inline border text-lg placeholder:text-base'
      type="text"
      value={vehicleColor}
      onChange={(e) => {
        setVehicleColor(e.target.value)
      }}
      placeholder='Vehicle Color' />
  </div>
  <div className='w-[47%]'>
    <input
      className='bg-[#eeee] w-full rounded px-4 py-2 border inline text-lg placeholder:text-base'
      type="text"
      value={vehiclePlate}
      onChange={(e) => {
        setVehiclePlate(e.target.value)
      }}
      placeholder='Vehicle Plate' />
  </div>
  <div className='w-[47%]'>
    <input
      className='bg-[#eeee] w-full rounded px-4 py-2 inline border text-lg placeholder:text-base'
      type="Number"
      value={vehicleCapacity}
      onChange={(e) => {
        setVehicleCapacity(e.target.value)
      }}
      placeholder='Vehicle Capacity' />
  </div>
  <div className='w-[47%]'>
  <select
    name="vehicleType"
    id="vehicleType"
    value={vehicleType}
    onChange={(e) => {
      setVehicleType(e.target.value);
    }}
    className="bg-[#eeee] w-full rounded px-4 py-2 inline border text-lg placeholder:text-base"
  >
  <option style={{ fontSize: "16px", color: "red" }}>Select vehicle Type</option>

    <option value="car">Car</option>
    <option value="motorcycle">Bike</option>
    <option value="truck">Truck</option>
    <option value="bus">Bus</option>
  </select>
</div>

</div>



          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-base '>Create Captain Account</button>
          <p className='text-center mb-4'>Already have a account?
            <Link to='/captain-login' className='text-blue-600'>Login in here</Link>  </p>

        </form>

      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Private Policy</span>
          <span className='underline'>  Terms of Service apply </span>

        </p>
      </div>
    </div>
  )
}





export default CaptainSignup