import React from 'react'
import { useEffect, useState } from 'react'
import '../css/Products.css';




function Products() {

    const productUrl = 'http://localhost:8080/api/v1/product'
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState(true)
    const [showProducts,setShowProducts] = useState(false)
    const [addProduct, setAddProduct] = useState(false)
    const [editProductForm, setEditProductForm] = useState(false)

    const [productId, setProductId] = useState()
    const [searchValue, setSearchValue] = useState()
    const [foundProduct,setFoundProduct] = useState()
    const [productName, setProductName] = useState()
    const [price,setPrice] = useState()
    const [weight,setWeight] = useState()


async function findAllproducts(){
    const res = await fetch(productUrl)
    const data = await res.json()
    setProducts(data)
    setLoading(false)
}

async function findProductByName(){
    const res = await fetch(productUrl  + '/name/' + searchValue)
    const data = await res.json()
    if(res.ok){
     setFoundProduct(data)
    }
}

const createProduct = async (e) => {
    e.preventDefault();
    const options = {
        method: 'POST',
        headers: {'Accept' : 'application/json',
        'Content-Type':'application/json'},
        body: JSON.stringify({
        'name' : productName,
        'price': price,
        'weight' : weight
      })
    };
     await fetch(productUrl,options);
     window.location.reload(false);
    }

    const deleteProduct = async (id) => {
        if(!window.confirm("Pas på! Du er ved at slette et eksisterende produkt.")){
            return
        }
        await fetch(productUrl + '/' + id, {
            method: "DELETE"
        })
        setLoading(true)
        var sleep = 600;
        setTimeout(function() {
            findAllproducts()
        }, sleep);        
}

const updateProduct = async(product, id) => {
    const response = await fetch(productUrl + '/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    await response.json();
    window.location.reload(false);

}


useEffect(() => {
    findAllproducts()
},[])

  return (
    <div className='body-products'>

<div className="buttons">
                <button className="add" onClick={()=>
                {{
                        if(showProducts || editProductForm || foundProduct){
                            setShowProducts(false);
                            setEditProductForm(false)
                            setFoundProduct(null)
                        }

                        setAddProduct(!addProduct)
                    }}}
                        
                        >Tilføj produkt</button>
                <button onClick={() =>
                    {{
                        if(addProduct || editProductForm || foundProduct){
                          setAddProduct(false)
                          setEditProductForm(false)
                          setFoundProduct(null)
                        }
                        setShowProducts(!showProducts)
                    }}}
                    
                    >Produkter</button>

                    

            </div>

            <div className={showProducts ? "products-container" : "hide-products"} >
            <div className="title">
                <h1>Produkter</h1>
            </div>

            <div className='search-bar'>
    <input style={{ border: searchInput ? "1px solid black" : "1px solid red" }} type={"text"} placeholder="Søg efter produkt" onChange={(e)=>{setSearchValue(e.target.value)}}/>
    <br></br><br></br>
    <button className='search-button' onClick={()=>{
        products.filter(product =>{
            if(searchValue === product.name){
                setSearchInput(true)
                findProductByName()
                setShowProducts(false)
                return;
            }
            else if(searchValue !== product.name){
                setSearchInput(false)
                return
        }
        //   if(searchValue === product.name){
        //         setSearchInput(true)
        //         findProductByName();
        //         setShowProducts(false)
        //         return
        //     }
              
        })
          
          
    }}>Søg</button>
</div>

            <div className="products">

                <table>
                    <thead>
                        <tr>
                            <th>Produkt-id</th>
                            <th>Navn</th>
                            <th>Pris</th>
                            <th>Vægt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && 
                    <tbody>
                        <tr>
                            <td style={{fontSize:"1.5em" ,textAlign:"center" }} colSpan="5">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
            }
            {!loading && 
                  <tbody className="product">
                    {products.map((product, i) => (
                            <tr key={i}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price} kr</td>
                                <td>{product.weight} gram</td>
                                <td>
                                    <button className="delete-button" onClick={() => {
                                      deleteProduct(product.id);
                                    }}>Slet</button>
                                    <button onClick={() => {
                                       setProductId(product.id);
                                       setEditProductForm(true)
                                       setShowProducts(false)
                                    }} className="update-button">Opdater</button>
                                    </td>

                            </tr>
                    ))}
                        </tbody>
                
                                }
                </table>
                </div>
        
            </div> 

           

            
    <div className="form-container">
        <form className={addProduct ? "show-form-container" : "hide-form"}>
        <h1>Opret nyt produkt</h1>

        <div className="input-form">
        <label>Produkt</label>
        <input type={"text"} value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>

        <label>Pris i kr</label>
        <input type={"number"} value={price} onChange={(e)=>{setPrice(e.target.value)}} />

        <label>Vægt i gram</label>
        <input type={"number"} value={weight} onChange={(e)=>{setWeight(e.target.value)}}/>

        <input className="submit" value={"Opret"} onClick={createProduct} type={"submit"}/>
            </div>
        </form>
    </div>


    <div>
    {foundProduct && 
    
        <div className='products'>
            <tabel>
                 <thead>
                        <tr>
                            <th>Produkt-id</th>
                            <th>Navn</th>
                            <th>Pris</th>
                            <th>Vægt i gram</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='product'>
                        <tr>
                            <td>{foundProduct.id}</td>
                            <td>{foundProduct.name}</td>
                            <td>{foundProduct.price}</td>
                            <td>{foundProduct.weight}</td>

                            <td>
                                    <button className="delete-button" onClick={() => {
                                      setFoundProduct(null)
                                      deleteProduct(foundProduct.id);
                                    }}>Slet</button>
                                    <button onClick={() => {
                                       setProductId(foundProduct.id);
                                       setEditProductForm(true)
                                       setShowProducts(false)
                                       setFoundProduct(null)
                                    }} className="update-button">Opdater</button>
                                    </td>

                        </tr>
                    </tbody>

                    </tabel>
        </div>
    }
</div>


     


    <div className={editProductForm ? "edit-container" : "hide-edit-container"}>

    <div className="title">
         <h1>Opdater Produkt</h1>
    </div>

<div className="edit-product">

    <table>
    <thead>
            <tr>
                <th>Produkt</th>
                <th>Pris</th>
                <th>Vægt i gram</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody className="product">

         {products.map(product => {
                if(productId === product.id){
                 
                    return(
                    <>
                <td><input type={"text"}  placeholder={product.name} value={productName} onChange={(e)=>{setProductName(e.target.value)}}/></td>
                <td><input type={"number"} placeholder={product.price} value={price} onChange={(e)=>{setPrice(e.target.value)}} /></td>
                <td><input type={"number"} placeholder={product.weight}  value={weight} onChange={(e)=>{setWeight(e.target.value)}}/></td>
                <td><input className="edit-product-button" onClick={() =>{
                   var updatedProduct = {
                        'name' : productName,
                        'price': price,
                        'weight' : weight
                    }

                    updateProduct(updatedProduct,product.id)
                }} value={"Opdater"} type={"submit"}/></td>
        </>
                    )
            }                           
    }
)
    } 
    </tbody>
           </table>
        </div>

    </div>   

</div>



  )
}

export default Products