import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';


function Login({
    history,
}) {
    const { setUser } = React.useContext(AuthContext);

    const handleOnLoginSubmitHandler = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;

        try {
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value, password: password.value })
            });

            if (!response.ok) {
                throw new Error((await response.json()).message);
            }

            const userData = await response.json();
            setUser({
                authToken: userData.accessToken,
                userId: userData._id,
                email: userData.email,
                username: userData.username,
                gender: userData.gender
            });

            history.push('/all-memes');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section id="login">
            <form onSubmit={handleOnLoginSubmitHandler} id="login-form">
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text" />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password" />
                    <input type="submit" className="registerbtn button" value="Login" />
                    <div className="container signin">
                        <p>Dont have an account?<Link to="/register">Sign up</Link>.</p>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Login;