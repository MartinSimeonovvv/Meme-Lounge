import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

function Details({
    match,
    history,
}) {
    const [singleMemeArticle, setSingleMemeArticle] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        return fetch(`http://localhost:3030/data/memes/${match.params.id}`)
            .then(res => res.json())
            .then(memeArticle => {
                setSingleMemeArticle(memeArticle);
            })
            .catch(err => alert(err.message));
    }, [match.params.id]);

    const deleteSingleMemeArticle = async () => {
        if (window.confirm('Please confirm to delete')) {
            await fetch(`http://localhost:3030/data/memes/${match.params.id}`, {
                method: 'DELETE',
                headers: { 'X-Authorization': user.authToken }
            });
            history.push('/all-memes');
        }
    };

    return (
        <section id="meme-details">
            <h1>Meme Title: {singleMemeArticle.title}

            </h1>
            <div className="meme-details">
                <div className="meme-img">
                    <img alt="meme-alt" src={singleMemeArticle.imageUrl} />
                </div>
                <div className="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        {singleMemeArticle.description}
                    </p>

                    {user.userId === singleMemeArticle._ownerId && (
                        <>
                            <Link className="button warning" to={`/edit/${match.params.id}`}>Edit</Link>
                            <button onClick={deleteSingleMemeArticle} className="button danger">Delete</button>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Details;