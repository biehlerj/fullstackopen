import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CountriesList = ({ list, search }) => {
  const data = list.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

  if (data.length > 10)
    return <p>Too many matches, specify another filter </p>
  if (data.length === 1)
    return <CountryDetail name={data[0].name.toLowerCase()} />

  return (
    <>
      {data.map(country => (<p key={country.name}>{country.name}</p>))}
    </>
  )
}

const CountryDetail = ({ name }) => {
  const [countryDetail, setCountryDetail] = useState([]);

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${name}`).then(response => setCountryDetail(response.data[0]));
  }, [name]);

  return (
    <div>
      <h2>{countryDetail.name}</h2>
      <p>{countryDetail.capital}</p>
      <p>Population {countryDetail.population}</p>
      <h3>Languages</h3>
      <ul>
        {countryDetail.languages && countryDetail.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={countryDetail.flag} height='150' alt={`${countryDetail.name} flag`} />
    </div>
  )
}

const App = (props) => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(response => setCountries(response.data));
  }, []);

  const onChangeHandler = (event) => setCountryName(event.target.value);

  return (
    <div>
      find countries
      <input onChange={onChangeHandler} />
      <CountriesList list={countries} search={countryName} />
    </div>
  )
}

export default App;
