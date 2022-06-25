import React from 'react'
import {useState} from 'react'
import {useLocation, Link, useHistory} from 'react-router-dom'


function EditPost({listings, setListings}) {
    const loc = useLocation()
    const history = useHistory()
    const {testid} = loc.state
    const {tname} = loc.state
    const {turl} = loc.state
    const {tcondition} = loc.state
    const {tlocation} = loc.state
    const {tset} = loc.state
    const {tcustomerEmail} = loc.state
    const {tprice} = loc.state
    
    const [id, setId] = useState(testid)
    console.log("this is the test id:" + testid + "   " + id)
    const [name, setName] = useState(tname)
    const [set, setSet] = useState(tset)
    const [condition, setCondition] = useState(tcondition)
    const [price, setPrice] = useState(tprice)
    const [location, setLocation] = useState(tlocation)
    const [url, setUrl] = useState(turl)
    const [customerEmail, setCustomerEmail] = useState(tcustomerEmail)
        


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
    //console.log(name);
}

const sendRequest = async(id, newUser) => {
    const response = await fetch(`${apiURL}/${id}`, {method: 'PUT', headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser)
})

const data = await response.json()
    setListings(listings.map((item) => item.id === id ? {...item, ...data } : item))
}

  const onSubmit = () => {
    const dataToSend = {
       id: id,
       name: name,
       condition: condition,
       set: set,
       price: price,
       location: location,
       url: url,
       customerEmail: customerEmail,
       buyerID: 0
    }
    history.push("/market")
    sendRequest(id, dataToSend)
  }

  return (
    <div>
      <form>
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
      <Link onClick={onSubmit } to={{pathname: '/editpost', state: {
                testid: id,
                tset: set,
                turl: url,
                tcondition: condition,
                tprice: price,
                tcustomerEmail: customerEmail,
                tname: name,
                tlocation: location
                }}}>subimt changes</Link>
      </form>
    </div>
  )
}

export default EditPost