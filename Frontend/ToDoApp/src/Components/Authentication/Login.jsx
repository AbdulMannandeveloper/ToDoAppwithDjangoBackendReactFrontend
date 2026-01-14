import useAuthStore from './Stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () =>{
    const navigate = useNavigate();
    console.log('Here');
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('hello');
        const success = await login(formData.username, formData.password);

        if(success){
            navigate('/dashboard');
        }
    };

    const handleChangePassword = () => {
        navigate('/ChangePassword');
    };

    const handleSignUp = () => {
        navigate('/SignUp');
    };

    return (
        <>
            <div>
                <h2>Login</h2>

                {error && (
                    <div style={{ color: 'red', marginBottom: '10px', background: '#ffe6e6', padding: '10px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type='text'
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required                                                   
                        />


                        <input
                            type='password'
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required                                                   
                        />

                        <button
                            type='submit'
                            disabled= {isLoading}
                        >

                            {isLoading ? 'Logging in...' : 'Login'}

                        </button>


                    </div>

                </form>


                <button
                    onClick={handleChangePassword}
                >
                    Change Password
                </button>

                <button
                    onClick={handleSignUp}
                >
                    Create New Account
                </button>



            </div>
        </>
    )
};


export default Login;