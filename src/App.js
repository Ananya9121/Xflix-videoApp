import './App.css';
import Landingpage from './Components/Landingpage';
import Videopage from './Components/Videopage';


import { Route, Switch } from "react-router-dom";


export const config = {
  endpoint: `https://xflix-node-an.herokuapp.com/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Switch>
     
         <Route path="/video/:id"><Videopage/></Route>

         <Route exact path="/"><Landingpage/></Route>

       </Switch>    
      </div>) 

}

export default App;
