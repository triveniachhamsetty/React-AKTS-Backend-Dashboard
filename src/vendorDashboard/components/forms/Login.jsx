import React, {useState} from 'react'
import { API_URL } from '../../APICREATIONS/ApiPath';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if(response.ok) {
        console.log("Login Response",data);
        setEmail('');
        setPassword('');
        alert('Login Success');
        localStorage.setItem('loginToken', data.token);
      }
      /*const vendorId = data.vendorId
      console.log("checking for vendorId:",vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        console.log("checking for Firmid ", vendorFirmId)
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log("My firm name is", vendorFirmName);
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName', vendorFirmName);
        //Refresh the window its javascript in built method
        window.location.reload()
        let vendorFirmName = null;
          if (vendorData.vendor.firm && vendorData.vendor.firm.length > 0) {
            vendorFirmName = vendorData.vendor.firm[0].firmName;
            console.log("My firm name is", vendorFirmName);
            localStorage.setItem('firmName', vendorFirmName);
          }

          localStorage.setItem('firmId', vendorFirmId || '');*/
          //window.location.reload();
           const vendorId = data.vendorId
          console.log("checking for VendorId:",vendorId)
          const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
          window.location.reload()
          const vendorData = await vendorResponse.json();
          if(vendorResponse.ok){
            const vendorFirmId = vendorData.vendorFirmId;
            const vendorFirmName = vendorData.vendor.firm[0].firmName;
            localStorage.setItem('firmId', vendorFirmId);
            localStorage.setItem('firmName', vendorFirmName)
      }
    }catch(err) {
        console.error(err);
        alert('Login failed');
      }

  }
  return (
    <div className="loginSection">
      <form className='authForm' onSubmit={loginHandler}>
        <h1>Vendor Login</h1>
        <label>Email</label>
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}placeholder='Enter your email' />
        <label>Password</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}placeholder='Enter your password' />
      <div className="btnSubmit">
        <button type='submit'>Submit</button>
    </div>
      </form>

    </div>
  )
}

export default Login;
