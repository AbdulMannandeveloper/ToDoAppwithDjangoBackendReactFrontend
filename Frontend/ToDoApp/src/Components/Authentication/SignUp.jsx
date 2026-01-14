import useAuthStore from './Stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () =>{
    const navigate = useNavigate();

    const SignUp = useAuthStore((state) => state.sign_up);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async(e) => {
        e.preventDefault();

        const success = await SignUp(formData.username, formData.email, formData.password);

        if(success){
            navigate('/login');
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <div>
                <h2>Sign Up</h2>

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

                        <label>email</label>
                        <input
                            type='email'
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required                                                   
                        />

                        <label>Password</label>
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

                            {isLoading ? 'Signed Up...' : 'SignUp'}

                        </button>


                    </div>

                </form>


                <button
                    onClick={handleLogin}
                >
                    Already Have an Account
                </button>



            </div>
        </>
    )
};


export default SignUp;