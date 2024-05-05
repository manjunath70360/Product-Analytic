
import {Route, Switch, BrowserRouter} from 'react-router-dom'


import Login from "./components/login"
import Home from "./components/Home"
import "./App.css"

const App = ()=> (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
    </Switch>
    </BrowserRouter>
)

export default App;