import React, { Component } from 'react';
import TimeKeeper from 'react-timekeeper';

export default class Clock extends Component {
  constructor(props){
    super(props)
    this.state = {
        time: '6:50 am',
        displayTimepicker: true
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }
  handleTimeChange(newTime){
      this.setState({ time: newTime.formatted})
  }
  toggleTimekeeper(val){
      this.setState({displayTimepicker: val})
  }
  
  render() {
    return (
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">Reloj Numero</h3>
            <hr/>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                {this.state.displayTimepicker ?
                  <center>
                  <TimeKeeper className="padding-bottom-5px"
                        time={this.state.time}
                        onChange={this.handleTimeChange}
                        onDoneClick={() => {
                            this.toggleTimekeeper(false)
                        }}
                        switchToMinuteOnHourSelect={true}
                    />
                  </center>
                  :
                  false 
                }
                <button className="btn btn-default full-width padding-top-5px" onClick={() => this.toggleTimekeeper(true)}>Cambiar Hora</button>
              </div>
              <div className="col-md-6">
                <h2 className="text-center">La hora es: <strong>{this.state.time}</strong></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
