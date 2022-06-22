import {useState, useEffect} from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([])
    const[custCount, setCustCount] = useState('')

  useEffect(
      () => {
          fetch("http://localhost:8088/customers")
          .then(res => res.json())
          .then(jsn => setCustomers(jsn))
      },
    []
  )
  useEffect(
      () => {
          if(customers.length === 1) {
              setCustCount('you have 1 customer')
          } else {
              setCustCount(`you have ${customers.length} customers`)
          }
      },
      [customers]
  )

    return (
    <>
        <div>{custCount}</div>
        <h1>Customer List</h1>
        {customers.slice(0,5).map(
            (custo) => {
                return <h2 key={`customer--${custo.id}`}>{custo.name}</h2>
            }
        )
    }
    </>
    )
}

export default CustomerList;
