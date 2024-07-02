import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Map from './components/Home/Map'
import Home from './components/Home/Home';

const libraries = ['places'];

function App() {
  return (
    <div>
      <Home/>
    </div>
  )
}

export default App
