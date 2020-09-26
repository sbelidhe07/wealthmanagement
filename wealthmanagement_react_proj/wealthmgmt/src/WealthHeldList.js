import  React, { Component } from  'react';
import  WealthHeldInfoService  from  './WealthHeldInfoService';

const  wealthHeldService  =  new  WealthHeldInfoService();

class  WealthHeldList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        wealthHeld: [],
        nextPageURL:  '',
        previousPageURL:''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.previousPage  =  this.previousPage.bind(this);
}

componentDidMount() {
    var  self  =  this;
    wealthHeldService.getWealthHeld().then(function (result) {
        console.log(result);
        self.setState({ wealthHeld:  result.data, previousPageURL: result.prevlink , nextPageURL:  result.nextlink})
    });

    console.log(this.state.wealthHeld);
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    wealthHeldService.getWealthHeldByURL(this.state.nextPageURL).then((result) => {
        self.setState({ wealthHeld:  result.data, nextPageURL:  result.nextlink})
    });
}

previousPage(){
    var  self  =  this;
    console.log(this.state.previousPageURL);
    wealthHeldService.getWealthHeldByURL(this.state.previousPageURL).then((result) => {
        self.setState({ wealthHeld:  result.data, previousPageURL:  result.prevlink})
    });
}
render() {

    return (
        <div  className="wealthheld--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>ID</th>
                <th>Ranking</th>
                <th>Name</th>
                <th>Category Id</th>
                <th>Year</th>
                <th>Net Worth</th>
            </tr>
            </thead>
            <tbody>
            {this.state.wealthHeld.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}</td>
                <td>{c.ranking}</td>
                <td>{c.name}</td>
                <td>{c.categoryId}</td>
                <td>{c.year}</td>
                <td>{c.networth}</td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.previousPage  }>Prev</button>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>

        </div>
        );
  }
}
export  default  WealthHeldList;
