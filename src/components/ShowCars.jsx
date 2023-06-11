import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

// Referencia a endpoint hecho con node y express
const URI = process.env.REACT_APP_API_URL;

const CompShowCars = () => {
    const [cars, setCars] = useState([]);
    // console.log(URI);
    useEffect(() => {
        getCars()
    }, [])

    // Procedimiento para mostrar carros
    const getCars = async () => {
        const res = await axios.get(`${URI}/cars`);
        // console.log(res);
        setCars(res.data);
    }

    // Procedimiento para eliminar un carro
    const deleteCar = async (id) => {
        await axios.delete(`${URI}/cars/${id}`);
        getCars();
        Swal.fire(
            'Deleted!',
            'Registro Eliminado Exitosamente!',
            'success'
        )
    }

    return (
        <>
            <Navbar />
            <div className='container mt-5 pt-4'>
                <div className='row'>
                    <div className='col'>
                        <span className='text-success badge fs-5 fw-bolder'>Agregar Registro</span>
                        <Link to='/create' className='btn btn-primary mt-2 mb-2'><i className='fas fa-plus'></i></Link>

                        <table className='table mt-1'>
                            <thead className='table-primary'>
                                <tr>
                                    <th>NIV</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Año</th>
                                    <th>Kilometraje</th>
                                    <th>Precio</th>
                                    <th>Fecha registrado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car) => (
                                    // console.log(car),
                                    <tr key={car._id}>
                                        <td>{car._id}</td>
                                        <td>{car.brand}</td>
                                        <td>{car.model}</td>
                                        <td>{car.year}</td>
                                        <td>{car.km}</td>
                                        <td>{car.price}</td>
                                        <td>{car.date_registered.split('T')[0] + ' ' + car.date_registered.split('T')[1].split('Z')[0]}</td>
                                        <td>
                                            <Link to={`/create/${car._id}`} className='btn btn-info'><i className='fas fa-edit'></i></Link>
                                            <button onClick={() => deleteCar(car._id)} className='btn btn-danger'><i className='fas fa-trash-alt'></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompShowCars;