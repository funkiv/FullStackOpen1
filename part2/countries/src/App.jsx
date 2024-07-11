import { useState, useEffect} from 'react'
import apiService from './services/api'

const SingleCountry = ({ singleCountry }) => {
    return(
        <div>
        <h1>{singleCountry.name.common}</h1>
        <p>capital {singleCountry.capital}</p>
        <p> area {singleCountry.area}</p>
        <h3>languages</h3>
        <ul>
            {Object.values(singleCountry.languages).map(e => <li key={e}>{e}</li>)}
        </ul>

        <img src={singleCountry.flags.png} alt={singleCountry.flags.alt}/>
    </div>
    )
}

const MultipleCountries = ({ filteredCountries, onSelectCountry }) => {

    return(
        filteredCountries.map((country) => 
            <p key={country.name.common}>
                {country.name.common}
                <button onClick={() => onSelectCountry(country)}>show</button>
            </p>
        )
    )
}

const RenderInfo = ({ countries, filter, selectedCountry , onSelectCountry }) => {
    const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().match(filter.toLowerCase()))
    if(selectedCountry != null) {
        return(
            <SingleCountry singleCountry={selectedCountry}/>            
        )
    } else if (filteredCountries.length === 1) {
        const singleCountry = filteredCountries[0]
        return(
            <SingleCountry singleCountry={singleCountry}/>
        )
    } else if (filteredCountries.length < 10) {       
        return (
            <MultipleCountries filteredCountries={filteredCountries} onSelectCountry={onSelectCountry}/>
        )       
    } else {
        return <p>Too many matches, specify another filter</p> 
    }
}

const App = () => {
    const [countries, setCountries] = useState(null)
    const [newFilter, setNewFilter] = useState("")
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedCountryWeather, setSelectedCountryWeather] = useState(null)
    const api_key = import.meta.env.VITE_WEATHER_KEY
    console.log(api_key)

    useEffect(() => {
        if (selectedCountry && selectedCountry.latlng) {
            apiService
                    .getAll(`https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCountry.latlng[0]}&lon=${selectedCountry.latlng[1]}&exclude=hourly,daily&appid=${api_key}`)      
                    .then(returnedWeather => {
                        setSelectedCountryWeather(returnedWeather)
                        console.log(returnedWeather)
                    })
        }
    }, [selectedCountry])

    useEffect(() => {
        apiService
            .getAll('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(returnedCountries => {
                setCountries(returnedCountries)
            })  
}, [])

    if (!countries) { 
    return null 
    } 

    const handleSelectCountry = (country) => {
        setSelectedCountry(country)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        setSelectedCountry(null)
    }
    
    return(
        <div>
            find countries
            <input onChange={handleFilterChange}/> 
            <RenderInfo countries={countries} filter={newFilter} selectedCountry={selectedCountry} onSelectCountry={handleSelectCountry} />
        </div>    
    )
}

export default App