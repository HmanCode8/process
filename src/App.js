import Home from './pages/Home'
import Login from './pages/Login'
import Tree from './pages/Tree'
import Pig from './pages/Pig'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tree' element={<Tree />} />
          <Route path='/pig' element={<Pig />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
