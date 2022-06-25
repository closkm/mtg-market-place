import React from 'react'
import { Children } from 'react'
import {useState} from 'react'
import "./Index.css"

function Sell({listings, userID}) {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
   const [set, setSet] = useState('')
   const [condition, setCondition] = useState('')
   const [price, setPrice] = useState('')
   const [location, setLocation] = useState('')
   const [url, setUrl] = useState('')


  const diction = {
    "name" : setName,
    "set": setSet,
    "condition": setCondition,
    "price": setPrice,
    "location": setLocation,
    "url": setUrl
  }

  const apiURL = 'http://localhost:8088/cards'

  
  const handleChange =(e) => {
    diction[e.target.id](e.target.value)
}

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
      console.log("new card added");
  }
  ))
}

  const onSubmit = () => {
 
    const testID = listings.length + 1
    const dataToSend = {
       name: name,
       condition: condition,
       set: set,
       price: price,
       location: location,
       url: url,
       id: testID,
       customerEmail: userID,
      buyerID: 0
    }
    sendRequest(dataToSend)
  }

  return (
    <div className="sellForm" >
      <h1 className="sellName">List Your Card for Sale</h1>
      <form onSubmit={onSubmit}>
        <fieldset className="sellfield">
      <input className="sellinput" id="name" type="text" placeholder='name' onChange={handleChange}  value={name} required />
        </fieldset>
        <fieldset className="sellfield">
      <input className="sellinput" id="set" type="text" placeholder='set' onChange={handleChange}  value={set} required/>
        </fieldset>
        <fieldset className="sellfield">
      <input className="sellinput" id="condition" type="text" placeholder='condition' onChange={handleChange}  value={condition} required/>
        </fieldset>
      <fieldset className="sellfield">
      <input className="sellinput" id="price" type="text" placeholder='price' onChange={handleChange}  value={price} required/>
      </fieldset>
      <fieldset className="sellfield">
      <input className="sellinput" id="location" type="text" placeholder='location' onChange={handleChange}  value={location} required/>
      </fieldset>
      <fieldset className="sellfield">
      <input className="sellinput" id="url" type="text" placeholder='url' onChange={handleChange}  value={url} required/>
      </fieldset>
      <fieldset className="sellfield">
      <button className="sellinput" type='submit' >Submit your listing</button>
      </fieldset>
      </form>

    </div>
  )
}

export default Sell