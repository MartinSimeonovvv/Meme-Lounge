import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

function Edit({
    match,
    history,
}) {
    const [singleMemeArticle, setSingleMemeArticle] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        return fetch(`http://localhost:3030/data/memes/${match.params.id}`)
            .then(res => res.json())
            .then(memeArticle => {
                setSingleMemeArticle(memeArticle);
            })
            .catch(err => alert(err.message));
    }, [match.params.id]);

    const onEditSubmitHandler = async (e) => {
        e.preventDefault();
        const { title, description, imageUrl } = e.target;

        try {
            if(!title.value || !description.value || !imageUrl.value){
                throw new Error('All fields are required!');
            }
    
            await fetch(`http://localhost:3030/data/memes/${match.params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-Authorization': user.authToken },
                body: JSON.stringify({ title: title.value, description: description.value, imageUrl: imageUrl.value})
            });
        } catch (error) {
            return alert(error.message);
        }
       
        return history.push(`/details/${match.params.id}`);
    }

    return (
        <section id="edit-meme">
            <form onSubmit={onEditSubmitHandler} id="edit-form">
                <h1>Edit Meme</h1>
                <div className="container">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" defaultValue={singleMemeArticle.title}/>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" defaultValue={singleMemeArticle.description}>
                    </textarea>
                    <label htmlFor="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" defaultValue={singleMemeArticle.imageUrl}/>
                    <input type="submit" className="registerbtn button" value="Edit Meme" />
                </div>
            </form>
        </section>
    );
}

export default Edit;