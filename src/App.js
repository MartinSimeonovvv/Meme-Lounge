import './App.css';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import AllMemes from './components/AllMemes';

import AuthContextProvider from './Contexts/AuthContext';
import Register from './components/Register';
import Create from './components/Create';
import Details from './components/Details';
import Edit from './components/Edit';
import MyMemes from './components/MyMemes';

function App() {
    return (
        <AuthContextProvider>
            <Header />
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/all-memes" component={AllMemes} />
                <Route exact path="/create-meme" component={Create} />
                <Route exact path="/details/:id" component={Details} />
                <Route exact path="/edit/:id" component={Edit} />
                <Route exact path="/my-profile" component={MyMemes} />
            </Switch>
        </AuthContextProvider>
    );
}

export default App;
