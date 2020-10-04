import  React, { Component } from  'react';
import  WealthHeldInfoService  from  './WealthHeldInfoService';
import queryString from 'query-string'

const  wealthHeldService  =  new  WealthHeldInfoService();

class  WealthHeldTSList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        wealthHeldTS: [],
        data :[],
        nextPageURL:  '',
        previousPageURL:'',
        count:0,
        numofpages:0,
        page: 1,
        selectedOption: 'All'
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.previousPage  =  this.previousPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

componentDidMount() {
    var  self  =  this;
    wealthHeldService.getWealthHeldTS().then(function (result) {
        //console.log(result);
        self.setState({ wealthHeldTS:  result.data, previousPageURL: result.prevlink , nextPageURL:  result.nextlink,count: parseInt(result.count),numofpages: result.numpages})
    });


    wealthHeldService.getAllTSData().then(function(result) {
      self.setState({data : result.data});
    });

    //console.log(this.state.wealthHeld);
}

nextPage(){
    var  self  =  this;
    let value = this.state.nextPageURL
    value = value.split("=");
    console.log(value[1]);
    wealthHeldService.getWealthHeldByURL(this.state.nextPageURL).then((result) => {
        self.setState({ page: parseInt(value[1]), wealthHeldTS:  result.data, nextPageURL:  result.nextlink,previousPageURL:  result.prevlink})
    });
}

previousPage(){
    var  self  =  this;
    let value = this.state.previousPageURL
    value = value.split("=");
    console.log(value[1]);
    wealthHeldService.getWealthHeldByURL(this.state.previousPageURL).then((result) => {
        self.setState({ page: parseInt(value[1]), wealthHeldTS:  result.data, previousPageURL:  result.prevlink,nextPageURL:  result.nextlink, numofpages: parseInt(result.numpages)})
    });
}

handleChange(event) {
    var self=this;
    console.log(event.target.value)
    let optval = event.target.value
     if (optval == 'All') {
        wealthHeldService.getWealthHeldTS().then(function (result) {
            //console.log(result);
            self.setState({ selectedOption: optval , wealthHeldTS:  result.data, previousPageURL: result.prevlink , nextPageURL:  result.nextlink,count: parseInt(result.count),numofpages: result.numpages})
        });
     } else {
         wealthHeldService.getWealthHeldTimeSeriesByYear(optval).then(function (result) {
            //console.log(result);
            self.setState({ selectedOption: optval , wealthHeldTS:  result.data, previousPageURL: result.prevlink , nextPageURL:  result.nextlink,count: parseInt(result.count),numofpages: result.numpages})
        });
    }
    console.log(self.state.wealthHeldTS);

 }

render() {
           const year = this.state.data.map(c => c.year)
           const values =   year.filter((q, idx) => year.indexOf(q) === idx)
           values.unshift("All")
           console.log(values)
    return (
        <div  className="wealthheldts--list">
            <center>
            <p><label><strong>Total Count: {this.state.count}</strong></label></p>
            <p><label><strong>Num Of Pages: {this.state.numofpages}</strong></label></p>
            </center>
            <div className="form-group">
                <label className="mr-1">Select Year</label>
                <select className="select-control" id="year" value={this.state.selectedOption} onChange={this.handleChange}>
                { values.map( c  => <option key={c} value={c}>{c}</option>)}
                 </select>
            </div>
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
            {this.state.wealthHeldTS.map( c  =>
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
            <button  disabled= { this.state.page === 1}  className="btn btn-primary mr-1"  onClick=  {  this.previousPage  }>Prev</button>

            <button  disabled= { (this.state.page === this.state.numofpages) || (this.state.numofpages === 1)}  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>

        </div>
        );
  }
}
export  default  WealthHeldTSList;
