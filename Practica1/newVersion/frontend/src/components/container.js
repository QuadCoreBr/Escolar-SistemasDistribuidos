import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addClock } from '../actions/clock.action';
import ClockList from '../containers/clockList.container';

import '../styles/app.css';

class Container extends Component{
    render(){
        return(
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
        );
    }
}
function mapStateToProps(state){
    return {
        clocks : state.clocks
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addClock},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Container);