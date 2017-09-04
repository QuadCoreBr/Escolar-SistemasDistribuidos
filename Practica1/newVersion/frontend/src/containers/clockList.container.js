import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Clock from './clock.container';
//container
class ClockList extends Component{
    render(){
        if (this.props.clocks.length === 0) {
            return(
                // <div className="col-md-12">
                //     <div className="row">
                //        <h3>Crea un Reloj para continuar</h3>
                //     </div>
                // </div>
                <Clock/>
            );
        } else {
            
        }
    }
}

function mapStateToProps(state){
    return {
        clocks : state.clocks
    };
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({addCharacterByID},dispatch);
// }

export default connect(mapStateToProps,null)(ClockList);