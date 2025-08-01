import React from 'react'

const WaitingForDriver = (props) => {

  
  
  return (
    <div >
      <h5
      onClick={()=>{
        props.setWaitingForDriverPanel(false);
      }}
      className='absolute top-0 w-[93%] text-center   '><i className=" text-3xl  text-gray-300 ri-arrow-down-wide-line p-10"></i></h5>
      <div className='flex items-center justify-between'>

        <img className='h-15' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>{props.ride?.captain?.fullname?.firstname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate}</h4>
        </div>
      </div>
      <div className='flex flex-col  gap-2 justify-between items-center'>


        <div className='w-full mt-5 '>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400 '>
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div >
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>

          </div>
          <div className='flex items-center gap-5  p-3 border-b-2 border-gray-400'>
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div >
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5  p-3'>
            <i className="ri-currency-line"></i>
            <div >
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver