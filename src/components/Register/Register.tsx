import React, {useState} from 'react';
import './Register.scss';

const Register = () => {
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false)

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    const checkPassword = (value: string) => {
        
    }

    return (<div className="Register" data-testid="Register">
        <div className="register-container">

            <div className="option-wrapper">
                <div className="register-form">
                    <div className="register-wrapper">
                        <h2>Please fill the remaining form</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <p>Email</p>
                                <input type="text" onChange={e => setEmail(e.target.value)}/>
                            </label>
                            <label>
                                <p>Username</p>
                                <input type="text" onChange={e => setUserName(e.target.value)}/>
                            </label>
                            <label>
                                <p>Password</p>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </label>
                            <label>
                                <p>Repeat password</p>
                                <input type="password" onChange={e => checkPassword(e.target.value)}/>
                            </label>
                            <div className={showError ? 'show error' : 'error'}>
                                Provided credentials are wrong
                            </div>
                            <div className='submit'>
                                <button className='register-btn' type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="option-wrapper">
                <div className="other-options">
                    <h2>Already have an account?</h2>
                    <button className="submit-btn">register</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Register;
