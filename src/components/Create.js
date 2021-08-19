import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function Create({
    history,
}) {
    const { user } = useContext(AuthContext);
    const [createFormInput, setCreateFormInput] = useState({
        title: '',
        description: '',
        imageUrl: '',
    });
    const onCreateSubmitHandler = async (e) => {
        e.preventDefault();
        const { title, description, imageUrl } = createFormInput;

        try {
            const response = await fetch('http://localhost:3030/data/memes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization': user.authToken },
                body: JSON.stringify({ title, description, imageUrl }),
            });

            if (!response.ok) {
                throw new Error((await response.json()).message);
            }

            history.push('/all-memes');
        } catch (error) {
            alert(error.message);
        }
    }

    const handleChange = (e) => {
        setCreateFormInput({
            ...createFormInput,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <section id="create-meme">
            <form onSubmit={onCreateSubmitHandler} id="create-form">
                <div className="container">
                    <h1>Create Meme</h1>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" onChange={handleChange} value={createFormInput.title} />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" onChange={handleChange} value={createFormInput.description}></textarea>
                    <label htmlFor="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl" onChange={handleChange} value={createFormInput.imageUrl}/>
                    <input type="submit" className="registerbtn button" value="Create Meme" />
                </div>
            </form>
        </section>
    );
}

export default Create;