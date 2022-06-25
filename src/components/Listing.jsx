import React from 'react'
import "./Index.css"
import { useHistory, useLocation } from "react-router-dom"
import {Link} from 'react-router-dom'

function Listing({listing, updateCart, market, deleteListing, userID, id, name, condition, url, set, price, location, customerEmail, orderButton }) {
    const history = useHistory()
    //console.log(id, name, condition, url, set, price, location, customerEmail)
    const onClick = (e) => {
        e.preventDefault()
        updateCart(prev => [...prev, listing.id])
        const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
        if(shoppingCart){
            //console.log(shoppingCart);
            localStorage.setItem("shoppingCart", JSON.stringify([...shoppingCart, listing.id]))
        } 
    }

    const remove = (id) => {
        let sCart = [];
        const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
        const index = shoppingCart.findIndex(shoppingCartID => id == shoppingCartID)
        for(const item of shoppingCart){
            if(item == id){
                continue;
            }
            sCart.push(item)
        }        
        localStorage.setItem("shoppingCart", JSON.stringify(sCart))
        updateCart(sCart)
        console.log(index);
    }

  return (
    <>
        <li className='categoryListing'>
        <img className="cardPic" src={listing.url} alt=""/>
            <div className="categoryListingDetails">
                <p className="categoryListingLocation listingtext">
                    {listing.location}
                </p>
                <p className="categoryListingName listingtext">
                    {listing.name}
                </p>
                <p className="categoryListingName listingtext">
                    {'Condition:'}{listing.condition}</p>
                <p className="categoryListingPrice listingtext">
                    {"$" + listing.price + ""}
                </p>
                {window.location.pathname.includes('/cart') ? orderButton ? <></> :(<button className="flexthis" onClick={() => remove(listing.id)}>Remove from Cart</button>) : (<button onClick={onClick}>add to cart</button>) }
                {market ? userID == listing.customerEmail ?  (<button  className="flexthis" onClick={() => deleteListing(listing.id)}>Delete</button>) : <></> : <></> }
                {market ? userID == listing.customerEmail ?  (<Link to={{pathname: '/editpost', state: {
                    testid: id,
                    tset: set,
                    turl: url,
                    tcondition: condition,
                    tprice: price,
                    tcustomerEmail: customerEmail,
                    tname: name,
                    tlocation: location
                }}}>Edit Post</Link>) : <></> : <></> }
                </div>
    </li>
    </>
  )
}

export default Listing