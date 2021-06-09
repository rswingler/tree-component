import React from 'react';
import './App.scss';
import { scenarios } from './_data/scenarios';
import exampleTree from './example-tree.png';
console.log('Provided dataset:', scenarios);


function App() {

  function onClick() {

  }

  return (
    <div className="App">
      <h2>Step 1. Build a tree view</h2>
      <div className="splitView">
        <div className="yourTree">
          <i>Render your tree here</i>
        </div>

        <div className="exampleTree">
          <img src={exampleTree} />
        </div>
      </div>

      <h2>Step 2. Configure your reducers</h2>
      <div>

      </div>
      

      <h2>Step 3. Using reducers update scenarioId <b>3396</b> with a name of <b>Changed my name!</b></h2>
      
      <div className="inputDataArea">
        Update Name: <input type="text" value="Changed my name!" /> <button onClick={onClick}>Update!</button>
      </div>
    </div>
  );
}

export default App;
