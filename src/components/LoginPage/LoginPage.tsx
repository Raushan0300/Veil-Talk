import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className='login-main-div'>
        <div className='login-text'>Welcome to Veil Talk</div>
        <input type="email" className='email-input' placeholder='Email' />
        <button className='login-btn'>Log In</button>
    </div>
  )
};

export default LoginPage;