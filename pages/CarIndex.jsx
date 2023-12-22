// CarIndex.jsx

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { carService } from '../services/car.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_CAR, ADD_CAR_TO_CART, REMOVE_CAR, SET_CARS, UPDATE_CAR } from '../store/store.js'

export function CarIndex() {
    const dispatch = useDispatch()


    // DONE: move to storeState
    // const [cars, setCars] = useState([])
    const cars = useSelector(storeState => storeState.cars)
    const cart = useSelector(storeState => storeState.shoppingCart)


    useEffect(() => {
        carService.query()
            // DONE: use dispatch
            .then(cars => {
                // setCars(cars)
                dispatch({ type: SET_CARS, cars })
            })
    }, [])

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                showSuccessMsg('Car removed')
                // DONE: use dispatch
                dispatch({ type: REMOVE_CAR, carId })
                // setCars(cars.filter(c => c._id !== carId))
            })
            .catch(err => {
                console.log('Cannot remove car', err)
                showErrorMsg('Cannot remove car')
            })
    }

    function onAddCar() {
        const carToSave = carService.getEmptyCar()

        carService.save(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car added (id: ${savedCar._id})`)

                // setCars(prevCars => [...prevCars, savedCar])
                // DONE: use dispatch
                dispatch({ type: ADD_CAR, car: savedCar })
            })
            .catch(err => {
                console.log('Cannot add car', err)
                showErrorMsg('Cannot add car')
            })
    }

    function onEditCar(car) {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }

        carService.save(carToSave)
            .then((savedCar) => {
                // DONE: use dispatch
                // setCars(cars.map(c => (c._id === car._id) ? carToSave : c))
                dispatch({ type: UPDATE_CAR, car: savedCar })
                showSuccessMsg(`Car updated to price: $${savedCar.price}`)
            })
            .catch(err => {
                console.log('Cannot update car', err)
                showErrorMsg('Cannot update car')
            })
    }

    function addToCart(car) {
        console.log(`Adding ${car.vendor} to Cart`)
        // TODO: use dispatch
        // setCart([...cart, car])
        dispatch({ type: ADD_CAR_TO_CART, car })
        showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <h3>Cars App</h3>
            <main>
                <button onClick={onAddCar}>Add Car ⛐</button>
                <ul className="car-list">
                    {cars.map(car =>
                        <li className="car-preview" key={car._id}>
                            <h4>{car.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${car.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => {
                                    onRemoveCar(car._id)
                                }}>x</button>
                                <button onClick={() => {
                                    onEditCar(car)
                                }}>Edit</button>
                            </div>
                            <button className="buy" onClick={() => {
                                addToCart(car)
                            }}>Add to Cart</button>

                        </li>)}
                </ul>
                <hr />
                <pre>{JSON.stringify(cart, null, 2)}</pre>
            </main>
        </div>
    )

}