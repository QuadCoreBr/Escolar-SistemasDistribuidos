import React, {Component} from 'react';

import Container from './container';

import '../styles/app.css';

class App extends Component{
    render(){
        return(
            <div className="App container-fluid">
                <div className="row header">
                    <h1 className="text-center">Practica 1</h1>
                    <hr/>
                </div>
                <Container></Container>
            </div>
        );
    }
}

export default App;