import { useState, useEffect } from 'react'
import Listing from './Listing'
import './Index.css'
import {Link, useHistory} from 'react-router-dom'


function Market({setCart, listings, setListings,userID}) {
    const [market, isMarket] = useState(true)
    const [edit, setEdit] = useState(false)
    const [search, setSearch] = useState("")
    const history = useHistory()
    const editPost = () => {setEdit(true)}

    const onClick = () => {
        history.push('/login')
        localStorage.clear()
    }
    const deleteListing =  async(id) => {
        if(window.confirm('are you sure you want to delete?')){ 
        await fetch(`http://localhost:8088/cards/${id}`, {
            method: 'DELETE',
            
    })

        setListings(listings.filter((item) => item.id != id))        
    }
    }
    const onChange = (e) => {
        setSearch(e.target.value)
    }

  return (
  <div className="category">
      <header className="headerMarket">
          <p className="pageHeader">Cards for Sale</p>
          <Link to="/sell" ><h3 className="sellLink">Sell your cards here</h3></Link>
    <button onClick={onClick}>Logout</button>
      </header>
      <input type="text" id="search" value={search} onChange={onChange} placeholder="Search" />
      <main>
<ul className="categoryListings">
    
        {listings.filter(card => {
            if(card.buyerID != 0) {return false}
            if(search.length === 0){
                return true
            } else if (card.name.toLowerCase().includes(search.toLowerCase())){
                return true
            } 
            return false;
        }).map(emp =>{return (<div>
        <Listing id={emp.id} name={emp.name} condition={emp.condition} url={emp.url} set={emp.set} 
        price={emp.price} location={emp.location} customerEmail={emp.customerEmail} key={emp.id} 
        listing={emp}  updateCart={setCart} 
        market={market} deleteListing={deleteListing} userID={userID} editPost={editPost} />
        </div>)
})}
        </ul>
        </main>
    </div>
  )
}

export default Market;
