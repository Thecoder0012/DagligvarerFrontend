import React from 'react'
import '../css/Delivery.css';
import { useEffect, useState } from 'react'

function Delivery() {
    
    const [showDeliveries,setShowDeliveries] = useState(false)
    const [addDelivery, setAddDelivery]= useState(false)
    const [deliveries,setDeliveries] = useState([])

    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [wareHouse, setWareHouse] = useState();
    const [destination, setDestination] = useState('');

    const deliveryUrl = "http://localhost:8080/api/v1/delivery";

    async function findAllDeliveries(){
        const res = await fetch('http://localhost:8080/api/v1/delivery');
        const data = await res.json();
        setDeliveries(data)
    }

    const createDelivery = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8080/api/v1/delivery';
        const options = {
            method: 'POST',
            headers: {'Accept' : 'application/json',
            'Content-Type':'application/json'},
            body: JSON.stringify({
            'deliveryDate' : deliveryDate,
            'wareHouse' : wareHouse,
            'destination' : destination
          })
        };
        await fetch(url,options);
        window.location.reload(false);
        }

    const deleteDelivery = async (id) => {
        if(!window.confirm("Pas på! Du er ved at slette en levering.")){
            return
        }
        await fetch(deliveryUrl + '/' + id, {
            method: "DELETE"
        })
        var sleep = 600;
        setTimeout(function() {
            findAllDeliveries()
        }, sleep);        
    }

    useEffect(() => {
        findAllDeliveries()
},[]);

  return (
    <div className='delivery-body'>

<div className="buttons">
                <button className="add" onClick={()=>
                    {{
                        if(showDeliveries){
                           setShowDeliveries(false)
                        }

                        setAddDelivery(!addDelivery)
                    }}}
                        
                        >Tilføj levering</button>
                <button onClick={() =>
                    {{
                        if(addDelivery){
                          setAddDelivery(false)
                        }
                        setShowDeliveries(!showDeliveries)
                    }}}
                    
                    >Se leveringer</button>

                    

            </div>

    <div className={addDelivery ? "add-delivery-container" : "hide-add-delivery-container"}>
    <form className="delivery-form" method="POST">
    <h1>Opret leverings-info</h1>
 <div className="inputs">

    <label>LeveringsDato</label>
    <input step="1" value={deliveryDate} onChange={(e)=>{setDeliveryDate(e.target.value)}} type={"datetime-local"} name="deliveryDate" />


    <label>Lagernavn</label>
    <input value={wareHouse} onChange={(e)=>{setWareHouse(e.target.value)}} type={"text"} name="wareHouse" />
  
    <label>Destination</label>
    <input value={destination} onChange={(e)=>{setDestination(e.target.value)}} type={"text"} name="destination" />


    <input className="submit" onClick={createDelivery}  type="submit" value={"Opret"}/>
    </div>
 </form>
 </div>


<div className={showDeliveries ? "show-delivery-container" : "hide-show-delivery-container"}>

<div className="deliveries">

<table>
   <thead>
       <tr>
           <th>Leverings-id</th>
           <th>Leveringsdato</th>
           <th>Lager</th>
           <th>Destination</th>
           <th>Actions</th>
       </tr>
   </thead>

 <tbody className="delivery">
   {deliveries.map((delivery, i) => (
           <tr key={i}>
               <td>{delivery.id}</td>
               <td>{delivery.deliveryDate}</td>
               <td>{delivery.wareHouse}</td>
               <td>{delivery.destination}</td>

               
               <td>
                      <button className="delete-button" onClick={() => {
                       deleteDelivery(delivery.id);
                       }}>Slet</button>
                     </td>



       
           </tr>
   ))}
       </tbody>

               
</table>
</div>
</div>



    </div>
  )
}

export default Delivery