import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CountriesList = ({ list, search }) => {
  const data = list.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

  if (data.length > 10)
    return <p>Too many matches, specify another filter </p>

  return (
    <>
      {data.map(country => <CountryDetail key={country.name} show={false} name={country.name} />)}
    </>
  )
}

const CountryDetail = (props) => {
  const [countryDetail, setCountryDetail] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${props.name}`).then(response => setCountryDetail(response.data[0]));
  }, [props.name]);

  return show
    ? (
      <div>
        <h2>{countryDetail.name}</h2>
        <button onClick={() => setShow(!show)}>hide</button>
        <p>{countryDetail.capital}</p>
        <p>Population {countryDetail.population}</p>
        <h3>Languages</h3>
        <ul>
          {countryDetail.languages && countryDetail.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={countryDetail.flag} height='150' alt={`${countryDetail.name} flag`} />
      </div>
    )
    : (
      <p key={countryDetail.name}>
        {countryDetail.name}
        <button onClick={() => setShow(!show)}>show</button>
      </p>
    )
}

const App = () => {
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
