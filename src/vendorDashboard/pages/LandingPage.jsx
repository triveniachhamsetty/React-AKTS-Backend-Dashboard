import React, {useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showFirmTitle, setShowFirmTitle] = useState(true)

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true)

    }
  },[])

  useEffect(()=>{
    const FirmName = localStorage.getItem('firmName');
    if(FirmName){
      setShowFirmTitle(false);
    }
  }, [])
  const logOutHandler = ()=>{
    confirm("Are you sure to logout ?")
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName')
    setShowLogOut(false)
    setShowFirmTitle(true)
  }
  const [showLogOut, setShowLogOut] = useState(false);
  const [showLogin, setShowLogin] = useState(false)
  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowAddFirm(false)
    setShowAddProduct(false) // Ensure Register is hidden when Login is shown
    setShowAllProducts(false);
  }
  const [showRegister, setShowRegister] = useState(false)
  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowAddFirm(false)
    setShowAddProduct(false) // Ensure Login is hidden when Register is shown
    setShowAllProducts(false);
  }
  const [showAddFirm, setShowAddFirm] = useState(false)
  const showAddFirmHandler = () => {
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)
    setShowAddFirm(true)
    setShowAddProduct(false) // Ensure AddProduct is hidden when AddFirm is shown
    setShowAllProducts(false);
    }else{
      alert("Please Login");
      setShowLogin(true)
    }
  }
  const [showAddProduct, setShowAddProduct] = useState(false)
  const showAddProductHandler = () => {
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)
    setShowAddProduct(true)
    setShowAddFirm(false) // Ensure AddFirm is hidden when AddProduct is shown
    setShowAllProducts(false);
    }else{
      alert("please Login")
      setShowLogin(true)
    }
  }
  const [showAllProducts, setShowAllProducts] = useState(false);
  const showAllProductsHandler = () => {
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)
    setShowAddProduct(false)
    setShowAddFirm(false)// Ensure AddFirm is hidden when AddProduct is shown
    setShowAllProducts(true);
    }else{
      alert("please Login")
      setShowLogin(true)
    }
  }

  return (
    <>
      <section className='landing-page'>
        <NavBar showLoginHandler= {showLoginHandler} showRegisterHandler = {showRegisterHandler} showLogOut = {showLogOut} logOutHandler = {logOutHandler}/>
        <div className='collectionSection'>
          <SideBar showAddFirmHandler = {showAddFirmHandler} showAddProductHandler = {showAddProductHandler}
          showAllProductsHandler = {showAllProductsHandler}
          showFirmTitle = {showFirmTitle}
          />
          {showLogin && <Login />}
          {showRegister && <Register showLoginHandler={showLoginHandler}/>}
          {showAddFirm && showLogOut &&  <AddFirm />}
          {showAddProduct && showLogOut && <AddProduct />}
          {showAllProducts && showLogOut &&<AllProducts />}
        </div>
      </section>
    </>
  )
}

export default LandingPage