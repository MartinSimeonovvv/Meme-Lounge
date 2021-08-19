import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

function MyMemes() {
    const [myMemes, setMyMemes] = useState([]);
    const { user } = useContext(AuthContext);
    console.log(user);

    useEffect(() => {
        return fetch(`http://localhost:3030/data/memes?where=_ownerId%3D%22${user.userId}%22&sortBy=_createdOn%20desc`)
            .then(res => res.json())
            .then(myMemes => {
                setMyMemes(myMemes);
            })
            .catch(err => alert(err.message));
    }, [user.userId]);

    if (!myMemes.length) {
        return <p className="no-memes">No memes in database.</p>;
    }
    return (
        <section id="user-profile-page" class="user-profile">
            <article className="user-info">
                <img id="user-avatar-url" alt="user-profile" src={`/images/${user.gender}.png`} />
                <div className="user-content">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>My memes count: {myMemes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div className="user-meme-listings">
                {
                    myMemes.map((meme, index) => {
                        return (
                            <div className="user-meme" key={index}> 
                                <p className="user-meme-title">{meme.title}</p>
                                <img className="userProfileImage" alt="meme-img" src={meme.imageUrl} />
                                <Link className="button" to={`/details/${meme._id}`}>Details</Link>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    )
}

export default MyMemes;