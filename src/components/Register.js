import { Link } from "react-router-dom";
import React from 'react';
import { AuthContext } from "../Contexts/AuthContext";

function Register({
    history
}) {
    const [input, setInput] = React.useState({
        username: '',
        email: '',
        password: '',
        repeatPass: '',
        gender: '',
    })
    const { setUser } = React.useContext(AuthContext);

    const handleRegsiterSubmitHandler = async (e) => {
        e.preventDefault();
        const { username, email, password, repeatPass, gender } = input;

        try {
            const response = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    gender
                })
            });

            if (!response.ok) {
                throw new Error((await response.json()).message);
            }

            if (password !== repeatPass) {
                throw new Error('Passwords don\'t match!');
            }

            const userData = await response.json();
            setUser({
                authToken: userData.accessToken,
                userId: userData._id,
                email: userData.email,
                username: userData.username,
                gender: userData.gender
            })

            history.push('/all-memes');
        } catch (error) {
            alert(error.message);
        }
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <section id="register">
            <form onSubmit={handleRegsiterSubmitHandler} id="register-form">
                <div className="container">
                    <h1>Register</h1>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        value={input.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="repeatPass">Repeat Password</label>
                    <input
                        id="repeatPass"
                        type="password"
                        placeholder="Repeat Password"
                        name="repeatPass"
                        value={input.repeatPass}
                        onChange={handleChange}
                    />
                    <div className="gender">
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            //value={input.gender}
                            onChange={handleChange}
                        />
                        <label htmlFor="female">Female</label>
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked
                            //value={input.gender}
                            onChange={handleChange}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <input
                        type="submit"
                        className="registerbtn button"
                        value="Register"
                    />
                    <div className="container signin">
                        <p>Already have an account?<Link to="/login">Sign in</Link>.</p>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Register;