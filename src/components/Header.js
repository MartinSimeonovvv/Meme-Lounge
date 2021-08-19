import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';


function Header() {
    const { setUser, user } = React.useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        await fetch('http://localhost:3030/users/logout');
        setUser({
            authToken: null,
            userId: null,
            email: null,
            username: null,
            gender: null
        });
        history.push('/');
    }
    return (
        <nav>
            <Link to="/all-memes">All Memes</Link>
            {
                user.authToken
                    ? <div className="user">
                        <Link to="/create-meme">Create Meme</Link>
                        <div className="profile">
                            <span>Welcome, {user?.email} </span>
                            <Link to="/my-profile">My Profile</Link>
                            <Link onClick={handleLogout} to="/">Logout</Link>
                        </div>
                    </div>
                    : <div className="guest">
                        <div className="profile">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                        <Link className="active" to="/">Home Page</Link>
                    </div>
            }
        </nav>
    );
}

export default Header;