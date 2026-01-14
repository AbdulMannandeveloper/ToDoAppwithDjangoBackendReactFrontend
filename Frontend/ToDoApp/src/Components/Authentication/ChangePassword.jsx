import useAuthStore from './Stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChangePassword = () =>{
    const navigate = useNavigate();

    const ChangePassword = useAuthStore((state) => state.changePassword);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);

    const [formData, setFormData] = useState({
        username: '',
        old_password: '',
        new_password: '',
    });

    const handleSubmit = async(e) => {
        e.preventDefault();

        const success = await ChangePassword(formData.old_password, formData.new_password);

        if(success){
            navigate('/login');
        }
    };

    return (
        <>
            <div>
                <h2>Change Password</h2>

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

                        <label>Old Password</label>
                        <input
                            type='password'
                            value={formData.old_password}
                            onChange={(e) => setFormData({...formData, old_password: e.target.value})}
                            required                                                   
                        />

                        <label>Password</label>
                        <input
                            type='new_password'
                            value={formData.new_password}
                            onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                            required                                                   
                        />

                        <button
                            type='submit'
                            disabled= {isLoading}
                        >

                            {isLoading ? 'Password is Changing...' : 'Change Password'}

                        </button>


                    </div>

                </form>

            </div>
        </>
    )
};


export default ChangePassword;