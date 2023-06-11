import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CompShowCars from './components/ShowCars';
import CompCreateCar from './components/CreateCar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowCars />}></Route>
          <Route path='/create' element={<CompCreateCar />}></Route>
          <Route path='/create/:id2' element={<CompCreateCar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
