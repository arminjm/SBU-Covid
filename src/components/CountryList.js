import React from 'react';
import CountryCard from "./CountryCard";

export default class CountryList extends React.Component {
    render() {
        return (
            this.props.countries.map(country => <CountryCard country={country} key={country.countryInfo._id} />)
        )
    }
}
