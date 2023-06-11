import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
// import BrandModel from "../../../api/models/BrandModel";

const URI = "http://localhost:9000"

const CompCreateCar = () => {
    const opcionesBrands = useMemo(() => [
        { value: '0', label: '-- Seleccione --' },
        { value: '1', label: 'Audi' },
        { value: '2', label: 'BMW' },
        { value: '3', label: 'Chevrolet' },
        { value: '4', label: 'Ford' },
        { value: '5', label: 'Honda' },
        { value: '6', label: 'Mazda' },
        { value: '7', label: 'Nissan' },
        { value: '8', label: 'Toyota' },
        { value: '9', label: 'Volkswagen' }
    ], []);

    const [id, setId] = useState('')
    // const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [year, setYear] = useState('')
    const [km, setKm] = useState('')
    const [precio, setPrecio] = useState('')
    const [brands, setBrands] = useState(opcionesBrands[0])
    const [disabled, setDisabled] = useState(false)
    const { id2 } = useParams();
    const [title, setTitle] = useState('')
    // const [fecha_reg, setFechaReg] = useState(new Date());
    const navigate = useNavigate();

    const getABrand = useCallback(async () => {
        const res = (await axios.get(`${URI}/cars/${id2}`)).data

        // console.log(res);
        setId(res._id);
        setBrands(opcionesBrands.find(option => option.label === res.brand));
        setModelo(res.model);
        setKm(res.km);
        setYear(res.year);
        setPrecio(res.price);
    }, [id2, opcionesBrands]);

    const getBrands = async () => {
        // try {
        const res = (await axios.get(`${URI}/brands`)).data;
        // console.log(res);
        setBrands(res);
        // console.log(brands);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    useEffect(() => {
        getBrands();
        // console.log(id2);
        if (id2) {
            getABrand();
            setDisabled(true);
            setTitle('Actualizacion de vehiculo!');
            // console.log(id2);
        } else {
            setDisabled(false);
            setTitle('Registro de Vehiculos')
        };
    }, [id2, getABrand]);

    const handleBrandChange = (e) => {
        // console.log(e.target);
        setBrands(opcionesBrands.find(a => a.value === e.target.value));
        // console.log(brands);
        // console.log(brands);
    }

    // Procedimiento guardar
    const store = async (e) => {
        e.preventDefault();
        // setFechaReg(new Date());

        // const fecha = formatDateTime(fecha_reg)
        // console.log(fecha);
        // // setFechaReg(fecha);

        // console.log({ _id: id, brand: brands.label, model: modelo, year: year, km: km, price: precio });
        // console.log(`${URI}/cars/${id2}`, { brand: brands.label, model: modelo, year: year, km: km, price: precio })
        if (brands.label === '-- Seleccione --') {
            Swal.fire('Por favor, seleccione una Marca valida!');
        } else {
            if (id2) {
                await axios.put(`${URI}/cars/${id2}`, { brand: brands.label, model: modelo, year: year, km: km, price: precio });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Datos Actualizados',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                await axios.post(`${URI}/cars`, { _id: id, brand: brands.label, model: modelo, year: year, km: km, price: precio });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro Agregado con Exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            navigate('/');
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
                <div className="card">
                    <h1 className="cardheader text-center">{title}</h1>
                    <div className="card-body">

                        <div className="form">
                            <form onSubmit={store}>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">NIV:</span>
                                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={id} onChange={(e) => setId(e.target.value)} disabled={disabled} required></input>
                                        </div>
                                        {/* <label className="form-label">NIV:</label>
                                    <input value={id} type="text" className="form-control" onChange={(e) => setId(e.target.value)} /> */}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Marca:</span>
                                            <select className="form-select" aria-label="Default select example" id='marca' value={brands.value} onChange={(e) => handleBrandChange(e)}>
                                                {opcionesBrands.map((op) => (
                                                    <option key={op.value} value={op.value}>
                                                        {op.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <span className="form-label">Marca:</span> */}
                                            {/* <input value={marca} type="text" className="form-control" onChange={(e) => setMarca(e.target.value)} /> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Marca:</label>
                                    <input value={marca} type="text" className="form-control" onChange={(e) => setMarca(e.target.value)} />
                                </div> */}

                                <div className="row">
                                    <div className='col-md-6'>
                                        <div className="input-group mb-default">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Modelo:</span>
                                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                                        </div>
                                    </div>

                                    {/* <div className="mb-3">
                                    <label className="form-label">Modelo</label>
                                    <input value={modelo} type="text" className="form-control" onChange={(e) => setModelo(e.target.value)} />
                                </div> */}

                                    <div className='col-md-6'>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Año:</span>
                                            <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={year} onChange={(e) => setYear(e.target.value)} required />
                                        </div>
                                    </div>

                                    {/* <div className="mb-3">
                                        <label className="form-label">Año:</label>
                                        <input value={year} type="number" className="form-control" onChange={(e) => setYear(e.target.value)} />
                                    </div> */}
                                </div>

                                <div className="row">
                                    <div className='col-md-6'>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Kilometraje:</span>
                                            <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={km} onChange={(e) => setKm(e.target.value)} required />
                                        </div>
                                    </div>
                                    {/* <div className="mb-3">
                                        <label className="form-label">Kilometraje</label>
                                        <input value={km} type="text" className="form-control" onChange={(e) => setKm(e.target.value)} />
                                    </div> */}

                                    <div className='col-md-6'>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Precio:</span>
                                            <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                                        </div>
                                    </div>
                                    {/* <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input value={precio} type="number" className="form-control" onChange={(e) => setPrecio(e.target.value)} />
                                    </div> */}
                                </div>

                                <div className="text-center">
                                    <div className="d-flex justify-content-evenly">
                                        {/* <button type="submit" className='btn btn-danger col-4' onClick={clean(objSetHooks, opcionesMarca)}>Cancelar</button> */}
                                        <button type="submit" className='btn btn-primary col-4'>Save</button>
                                    </div>
                                </div>

                            </form >
                        </div> {/* Cierra form */}
                    </div> {/* Cierra card-body */}
                </div> {/* Cierra card */}
            </div> {/* Cierra container */}
        </>
    )
}

export default CompCreateCar;