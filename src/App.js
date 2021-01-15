import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InforBox from './InforBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import './App.css';
import { sortData, prettyPrintStat } from './util'


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState('cases');
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 38.80746, lng: 19.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetchCountryInfo(country)
  }, []);

  useEffect(() => {
    // async -> send a request, wait for it, do something
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const APIcountries = data.map((country) => (
            {
              name: country.country, // United States, United Kingdom
              value: country.countryInfo.iso2,  // US, UK
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(APIcountries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const fetchCountryInfo = async (countryCode) => {
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        // All of the data from the country response
        setCountryInfo(data);
        if (countryCode !== 'worldwide') {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
      })
  };

  const renderCountriesList = () => (
    countries.map((country, index) => {
      return <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
    })
  )

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    fetchCountryInfo(countryCode)
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          <h1>COVID-19 TRACKER</h1>
          {/* Title + Select Input Field */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {renderCountriesList()}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* Infor box - Cases */}
          <InforBox
            isRed
            active={casesType === 'cases'}
            onClick={() => { setCasesType('cases') }}
            title="Coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />
          {/* Infor box - Recovered */}
          <InforBox
            active={casesType === 'recovered'}
            onClick={() => { setCasesType('recovered') }}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
          />
          {/* Infor box - Detail */}
          <InforBox
            isRed
            active={casesType === 'deaths'}
            onClick={() => { setCasesType('deaths') }}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
          />
        </div>
        {/* Map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3 className="newCases">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div >
  );
}

export default App;
