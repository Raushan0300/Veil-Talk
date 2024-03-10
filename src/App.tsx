import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Navigate to='/login' />} /> */}
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
