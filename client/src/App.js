import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import GameDetail from "./components/GameDetail";
import CreateGame from "./components/CreateGame";
import NotCategory from "./components/NotCategory";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/videogames" component={Home} />
          {/* <Route exact path="/videogame/404notfound"> <Redirect to="/videogames"/> </Route> */}
          <Route exact path="/videogame/404notfound" component={NotCategory}/>
          <Route
            exact
            path="/videogame/:id"
            render={({ match }) => <GameDetail id={match.params.id} />}
          />
          <Route path="/creategame" component={CreateGame} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
