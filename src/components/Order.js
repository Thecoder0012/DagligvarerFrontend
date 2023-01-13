import React from 'react'
import '../css/Order.css';
import { useEffect, useState } from 'react'

function Order() {

    const [products,setProducts] = useState([])
    const [deliveries,setDeliveries] = useState([])
    const [orders,setOrders] = useState([])


    const [showOrders,setShowOrders] = useState(false)
    const [addOrder, setAddOrder] = useState(false)

    const [quantity, setQuantity] = useState();
    const [orderProduct, setOrderProduct] = useState(0);
    const [orderDelivery, setOrderDelivery] = useState(0);

    const orderUrl = "http://localhost:8080/api/v1/order";
    

async function findAllProducts(){
        const res = await fetch('http://localhost:8080/api/v1/product');
        const data = await res.json();
        setProducts(data)
}
async function findAllDeliveries(){
    const res = await fetch('http://localhost:8080/api/v1/delivery');
    const data = await res.json();
    setDeliveries(data)
}

async function findAllOrders(){
    const res = await fetch('http://localhost:8080/api/v1/order');
    const data = await res.json();
    setOrders(data)
}

const deleteOrder = async (id) => {
    if(!window.confirm("Pas på! Du er ved at slette en eksisterende ordre.")){
        return
    }
    await fetch(orderUrl + '/' + id, {
        method: "DELETE"
    })
    var sleep = 600;
    setTimeout(function() {
        findAllOrders()
    }, sleep);        
}




    useEffect(() => {
    findAllProducts()
    findAllDeliveries()
    findAllOrders()
    },[]);

    
const createOrder = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/api/v1/order';
    const options = {
        method: 'POST',
        headers: {'Accept' : 'application/json',
        'Content-Type':'application/json'},
        body: JSON.stringify({
        'quantity' : quantity,
        'product':{
        'id' : orderProduct

        },
        'delivery':{
            'id': orderDelivery
        }
      })
    };
    await fetch(url,options);
    window.location.reload(false);
    }
  
    


  return (

    <div className='body'>
        <div className="buttons">
                <button className="add" onClick={()=>
                    {{
                        if(showOrders){
                           setShowOrders(false)
                        }

                        setAddOrder(!addOrder)
                    }}}
                        
                        >Tilføj bestilling</button>
                <button onClick={() =>
                    {{
                        if(addOrder){
                          setAddOrder(false)
                          
                        }
                        setShowOrders(!showOrders)
                    }}}
                    
                    >Bestillinger</button>

                    

            </div>


  <div className={showOrders ? "show-order-container" : "hide-show-order-container"}>

 <div className="orders">

<table>
    <thead>
        <tr>
            <th>Ordre-id</th>
            <th>Produkt navn</th>
            <th>Pris</th>
            <th>Vægt</th>
            <th>Antal</th>
            <th>Totale pris</th>
            <th>Leveringdato</th>
            <th>Lager</th>
            <th>Destination</th>
            <th>Actions</th>


        </tr>
    </thead>
 
  <tbody className="order">
    {orders.map((order, i) => (
            <tr key={i}>
                <td>{order.id}</td>
                <td>{order.product.name}</td>
                <td>{order.product.price} kr</td>
                <td>{order.product.weight} gram</td>
                <td>{order.quantity}</td>
                <td>{order.quantity * order.product.price} kr</td>
                <td>{order.delivery.deliveryDate}</td>
                <td>{order.delivery.wareHouse}</td>
                <td>{order.delivery.destination}</td>

                
                <td>
                                    <button className="delete-button" onClick={() => {
                                      deleteOrder(order.id);
                                    }}>Slet</button>
                                
                                    </td>



        
            </tr>
    ))}
        </tbody>

                
</table>
</div>
</div>



    <div className={addOrder ? "add-order-container" : "hide-add-order-container"}>
    <form className="order-form" method="POST">
    <h1>Opret din bestilling</h1>
 <div className="inputs">

 <label>Vælg produkt</label>
    <select onChange={(e)=>{setOrderProduct(e.target.value)}} name="products">
    <option selected>- -</option>
    {
      products.map((product) => (
          <option value={product.id}  key={product.id}>{product.name} {product.weight} gram</option>
      ))
    }
</select>

<label>Antal produkter</label>
    <input value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} type={"number"} name="quantity" />


<label>Vælg destination</label>
    <select onChange={(e)=>{setOrderDelivery(e.target.value)}} name="delivery">
    <option selected>- -</option>
    {
      deliveries.map((delivery) => (
          <option value={delivery.id}  key={delivery.id}>Til {delivery.destination} fra {delivery.wareHouse}</option>
      ))
    }
</select>
    <input className="submit" onClick={createOrder}  type="submit" value={"Bestil"}/>
    </div>
    </form>
</div>
</div>
  )
}

export default Order