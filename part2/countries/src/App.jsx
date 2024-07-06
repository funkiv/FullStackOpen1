import { useState, useEffect} from 'react'
import countryService from './services/countries'

const Countries = ({ countries, filter}) => {
    const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().match(filter.toLowerCase()))

    if (filteredCountries.length === 1) {
        const singleCountry = filteredCountries[0]
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
    } else if (filteredCountries.length < 10) {       
        return (
            filteredCountries.map((country) => 
                <p key={country.name.common}>{country.name.common}</p>
            )
        )       
    } else {
        return <p>Too many matches, specify another filter</p> 
    }
}

const App = () => {
    const [countries, setCountries] = useState(null)
    const [newFilter, setNewFilter] = useState("")
    
    useEffect(() => {
    countryService
        .getAll()
        .then(returnedCountries => {
            setCountries(returnedCountries)
        })  
}, [])

if (!countries) { 
    return null 
  } 

const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

  }
    
return(
<div>
    find countries
    <input onChange={handleFilterChange}/> 
    <Countries countries={countries} filter={newFilter} />
</div>    
)
}

export default App