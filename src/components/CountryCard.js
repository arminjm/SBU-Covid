import React from 'react';

export default class CountryCard extends React.Component {
    render() {
        let country = this.props.country;
        return (
            <div className='card mt-3'>
                <div className="card-header">{country.country}</div>
                <div className="card-body px-5">
                    <div className="row">
                        <div className="col-6">
                            <p>Today Cases</p>
                            <p>{country.todayCases}</p>
                        </div>
                        <div className="col-6">
                            <p>Critical</p>
                            <p>{country.critical}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>Today Deaths</p>
                            <p className="text-danger">{country.todayDeaths}</p>
                        </div>
                        <div className="col-6">
                            <p>Today Recovered</p>
                            <p className="text-success">{country.todayRecovered}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}