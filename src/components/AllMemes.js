import { useState, useEffect } from 'react';

import MemeCard from './MemeCard';

function AllMemes() {
    const [memeArticles, setMemeArticles] = useState([]);

    useEffect(() => {
        return fetch('http://localhost:3030/data/memes?sortBy=_createdOn%20desc')
            .then(res => res.json())
            .then(data => {
                setMemeArticles(data);
            })
            .catch(err => alert(err.message));
    }, []);
    
    if (!memeArticles.length) {
        return <p className="no-memes">No memes in database.</p>;
    }


    return (
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                {memeArticles.map((article, index) => {
                    return <MemeCard key={index} {...article} />
                })}
            </div>
        </section>
    )
}

export default AllMemes;