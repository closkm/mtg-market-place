import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom'
import Cart from './Cart';
import Market from './Market';
import Sell from './Sell'
import EditPost from './EditPost.jsx'

function ApplicationViews() {
  const [cart, setCart] = useState([])
  const [listings, setListings] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [userID, setUserID] = useState(0)
  const [orders, setOrders] = useState([])


  useEffect(() => {
    fetchFeedback()
    fetchOrders()
    setCart(localStorage.getItem("shoppingCart"))
        },[])
  useEffect(() => {
  setUserID(localStorage.getItem("honey_customer"))
        },[localStorage.getItem("honey_customer")])

const fetchFeedback = async () => {
    const response = await fetch(`http://localhost:8088/cards`)
    const data = await response.json()
    setListings(data)
    setIsLoading(false)
}

const fetchOrders = async () => {
  const response = await fetch(`http://localhost:8088/orders`)
  const data = await response.json()
  setOrders(data)
}


  return (
  <>
        <Route path='/cart'>
          <Cart userID={userID}  cart={cart} setListings={setListings} orders={orders} listings={listings} setCart={setCart} />
          </Route>

        <Route path='/market'>
          <Market setCart={setCart} listings={listings} setListings={setListings}  userID={userID} />
          </Route>

        <Route path='/sell'>
          <Sell listings={listings}  userID={userID}  />
          </Route>

        <Route path='/editpost'>
          <EditPost listings={listings} setListings={setListings} />
          </Route>

  </>
  )
}



export default ApplicationViews;
