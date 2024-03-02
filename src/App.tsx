import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Navigate to='/login' />} /> */}
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
