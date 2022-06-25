import {useState, useEffect} from 'react'
import Listing from './Listing'

function Cart({cart, listings, setCart, userID}) {
  const [order, setOrder] = useState()
  const [check, setCheck] = useState(false)
  const [test, setTest] = useState()
  const [orderButton, setOrderButton] = useState(true)
  
  const updateBuyer = (id, listing) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(listing)
    }
  
    return fetch(`${apiURL2}/${id}`, fetchOptions)
    .then(response => response.json()
    .then(request => {
        console.log("buyer updated");
    }
    ))
  }

  useEffect(() => {
    for(const c of cart){
      if(c >= 0){
        setCheck(true);
      } 
    }
  }, [cart])

const fetchCard = async (id) => {
  const response = await fetch(`http://localhost:8088/cards/${id}`)
  const data = await response.json()
setTest(data)
console.log(data);
}

  const onClick = () => {
    const mike = []
    const currentCart = JSON.parse(localStorage.getItem('shoppingCart'))

    const id = order ? order.length : 0;
    const dataToSend={
      id: id,
      cards: currentCart,
      userID: userID,
    }
    sendRequest(dataToSend)
    
    currentCart.forEach(card => {
      if(card >= 0){
        const foundListing = listings.find((listing) => card == listing.id)
        foundListing.buyerID = userID;
        console.log(foundListing);
        updateBuyer(card, foundListing)
      }
    })
    setCart([])
    localStorage.setItem("shoppingCart", JSON.stringify(mike))
  }

  const apiURL = 'http://localhost:8088/orders'
  const apiURL2 = 'http://localhost:8088/cards'

const sendRequest = (newUser) => {
  const fetchOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
  }

  return fetch(apiURL, fetchOptions)
  .then(response => response.json()
  .then(request => {
      
  }
  ))
}




  return (
    <div className="category">
    <header>
        <h1 className="pageHeader">My Cart</h1>
    </header>
    <main>
    <ul className="categoryListings">
      {listings.map((listing) => {
      for(const item of cart){
        if(listing.id == item){
          return <Listing key={listing.id} listing={listing} cart={cart} updateCart={setCart} />
        }
      }
      })}
      </ul>
    </main>
      <div>
    {check && <button onClick={onClick}>Checkout</button>}
      </div>
      <h1 className="pageHeader">Your Orders</h1>
      <ul className="categoryListings">
      {listings.filter(listing => {
        if(listing.buyerID == userID){
          return true
        } 
        return false
      }).map(listing => {
        return <Listing key={listing.id} listing={listing} orderButton={orderButton} />
      })}
      </ul>
    </div>
  )
}

export default Cart