import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './Pages/Products/Products';
import Header from './Containers/Header/Header';
import SingleProduct from './Pages/SingleProduct/SingleProduct';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' Component={Products} />
          <Route path='/Product/:id' Component={SingleProduct} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
