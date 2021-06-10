import React, {useEffect, useState} from 'react';
import './App.scss';
import {scenarios} from './_data/scenarios';
import exampleTree from './example-tree.png';
import TreeMenu from "./TreeMenu";
import {Provider, useDispatch, useSelector} from "react-redux";
import {createStore} from "@reduxjs/toolkit";
import ScenariosReducer from "./reducers/ScenariosReducer";
console.log('Provided dataset:', scenarios);

const store = createStore(ScenariosReducer);

function App() {
    return (
        <Provider store={store}>
            <ReduxApp/>
        </Provider>
    );
}

function ReduxApp() {

    const dispatch = useDispatch();
    const myScenarios = useSelector(state => state.scenarios);
    const [inputValue, setInputValue] = useState("Changed my name!");

    function updateName() {
        let i = myScenarios.findIndex(n => n.scenarioId === 3396);
        myScenarios[i].scenarioName = inputValue;
        dispatch({type: 'UPDATE', value: myScenarios});
    }

    //Init
    useEffect(() => {
        dispatch({type: 'UPDATE', value: scenarios});
    }, []);

    return (
        <div className="App">
            <h2>Step 1. Build a tree view</h2>
            <div className="splitView">
                <div className="yourTree">
                    {myScenarios && <TreeMenu nodes={myScenarios}/>}
                </div>
                <div className="exampleTree">
                    <img alt='Example Tree' src={exampleTree}/>
                </div>
            </div>

            <h2>Step 2. Configure your reducers</h2>
            <div></div>

            <h2>Step 3. Using reducers update scenarioId <b>3396</b> with a name of <b>Changed my name!</b></h2>

            <div className="inputDataArea">
                Update Name: <input type="text" value={inputValue} onChange={t => setInputValue(t.target.value)}/>
                <button onClick={updateName}>Update!</button>
            </div>
        </div>
    );
}

export default App;
