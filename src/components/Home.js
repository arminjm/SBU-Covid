import React from 'react';
import CountryList from "./CountryList";
import ProgressBar from "./ProgressBar";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            search: '',
            sort: 'todayCases',
            message: '',
            history: this.countries
        };
    }

    componentDidMount() {
        this.getData();
    }

    // fetch data from api and set data
    getData = () => {
        let {sort, search,history} = this.state;
        let query = search ? ('/' + search) : '';
        this.setState({data: [], loading: true})
        fetch('https://corona.lmao.ninja/v2/countries' + query + '?yesterday=true&sort=' + sort).then(res => res.json()).then(data => {
            if (data.country) history = this.setHistory(history,data.country);
            this.setState({
                message: data.message ? data.message : '',
                data: Array.isArray(data) ? data : [data],
                history: history,
                loading: false
            });
        }).catch(() => this.setState({loading: false}));
    }

    // get countries from local storage
    countries = localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries')) : [];

    // save value when change input
    searchListener = (e) => this.setState({search: e.target.value.toLowerCase()})

    // save value when change sorting data
    sortListener = (e) => this.setState({sort: e.target.value},this.getData)

    // set country from history and get data
    setData = (value) => this.setState({search: value},this.getData);

    // check and add country to local storage
    setHistory = (history,country) => {
        history = !history.includes(country) ? [country,...history] : history;
        if (history.length > 10)history.splice(history.length - 1,1)
        localStorage.setItem('countries', JSON.stringify(history));
        return history;
    }

    // clear country from local storage
    clearHistory = () => {
        localStorage.removeItem("countries");
        this.setState({history: []});
    }

    render() {
        return (<div>
                <nav className="navbar bg-light">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="form-inline">
                                <h5 className="mr-3">COVID - 19</h5>
                                <div className="form-group mr-2">
                                    <input type="text" className="form-control" value={this.state.search} onChange={this.searchListener}/>
                                </div>
                                <button className="btn btn-danger" onClick={this.getData}>Go</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <input type="radio" name="sort" id="cases" value="todayCases"
                                   checked={this.state.sort === 'todayCases'} onChange={this.sortListener}/>
                            <label htmlFor="cases">Today Cases</label>
                            <input type="radio" name="sort" value="todayDeaths" checked={this.state.sort === 'todayDeaths'}
                                   onChange={this.sortListener}/>
                            <label htmlFor="deaths">Today Deaths</label>
                            <input type="radio" name="sort" value="todayRecovered" checked={this.state.sort === 'todayRecovered'}
                                   onChange={this.sortListener}/>
                            <label htmlFor="recovered">Today Recovered</label>
                        </div>
                    </div>
                </nav>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <div className='col-12 col-lg-3'>
                            <div className="card mt-3">
                                <div className="card-header d-flex justify-content-between">
                                    Search History
                                    {this.state.history.length ? <button className="btn btn-danger btn-sm" onClick={this.clearHistory}>Clear</button> : ''}
                                </div>
                                <div className="card-body">
                                    {this.state.history.length ? <ul className="list-group">
                                        {this.state.history.map((item, index) => <li key={index}
                                                                                     className="list-group-item" onClick={() => this.setData(item)}>{item}</li>)}
                                    </ul> : <div>Empty List</div>}
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-7 offset-0 offset-lg-1'>
                            {!this.state.loading ? this.state.message ?
                                <div className="col-12 alert alert-warning">Nothing to display!</div> :
                                <CountryList countries={this.state.data.slice(0, 5)}/> : <ProgressBar/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}