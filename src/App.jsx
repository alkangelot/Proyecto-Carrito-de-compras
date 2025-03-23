import { useState, useEffect } from 'react'
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from './data/db'

function App() {
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    function addToCart(item){
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if(itemExist < 0){
            item.quantity = 1
            setCart([...cart, item])
        } else {
            console.log('Ya existe');
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id){
        const updateCart = cart.map( item => {
            if(item.id === id){
                return {
                    ...item,
                    quantity: item.quantity +1
                }

            }
            return item
        })
        setCart(updateCart)
    }

return (
    <>
    <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=> (
                <Guitar
                    key = {guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
)
}

export default App
