import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import  WealthHeldList from './WealthHeldList'
import BarChart from './BarChart'
import PieChart from './PieChart'
import './App.css';


class App extends Component {


 state = {
    data: [12, 5, 6, 6, 9, 10],
    pwidth: 600,
    pheight: 400,
    bwidth: 1400,
    bheight: 450,
    pid: 'proot',
    bid: 'broot'
  }



  render() {
    return (
      <Router>
         <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
            <div className="container-fluid">
                    <a className="navbar-brand" href="#">WealthHeld Dashboard</a>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                     <div className="collapse navbar-collapse" id="navbarNavDropdown">
                         <ul className="navbar-nav">
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                                Billionaires Info
                                            </a>
                                          <ul className="dropdown-menu">
                                                  <li>
                                                    <a className="dropdown-item" href="#">
                                                      Current Billionaires
                                                    </a>
                                                     <ul className="submenu dropdown-menu">
                                                        <li><a className="dropdown-item" href="/wheldinfo">Data</a></li>
                                                        <li><a className="dropdown-item" href="/barchart">Bar chart</a></li>
                                                        <li><a className="dropdown-item" href="/piechart">Pie Chart</a></li>
                                                     </ul>
                                                    </li>
                                                 <li><a className="dropdown-item" href="/wheldtsinfo">Billionaire''s Time Series</a></li>
                                            </ul>
                                          </li>
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                              Billionaires Family
                                            </a>
                                          </li>
                                         <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                              Universities
                                            </a>
                                          </li>
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                              Colleges
                                            </a>
                                          </li>
                                         <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                              Tech Companies
                                            </a>
                                          </li>
                                           <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                              Religious Groups
                                            </a>
                                          </li>
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                              Non-Profit Organizations
                                            </a>
                                          </li>
                                           <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                              NGOs
                                            </a>
                                          </li>
                                        </ul>
                                </div>
                                 </div>
                           </nav>

                 <br />
                <Switch>
                    <Route path="/wheldinfo" exact component={WealthHeldList} />

                    <Route
                    path='/barchart'
                    render={(props) => (
                    <BarChart {...props} data={this.state.data} width={this.state.bwidth} height={this.state.bheight}/>
                    )}
                    />

                    <Route
                    path="/piechart"
                    render={(props) => (
                    <PieChart {...props} data={this.state.data} width={this.state.pwidth} height={this.state.pheight}/>
                    )}
                    />
                </Switch>

    </Router>
    );
  }
}

export default App;
