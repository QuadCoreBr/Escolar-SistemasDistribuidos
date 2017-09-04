import React, {Component} from 'react';

import ClockList from '../containers/clockList.container';

import '../styles/app.css';

class App extends Component{
    render(){
        return(
            <div className="App container-fluid">
                <div className="row header">
                    <h1 className="text-center">Practica 1</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-md-3 side-menu">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <button type="button" className="btn btn-default full-width">Agregar Reloj</button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <ClockList></ClockList>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;