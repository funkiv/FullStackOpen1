import { useState, useEffect} from 'react'
import countryService from './services/countries'

const App = () => {
    const [countries, setCountries] = useState(null)
    const [newFilter, setNewFilter] = useState("")

    useEffect(() => {
    countryService
    .getAll()
    .then(returnedCountries => {setCountries(returnedCountries)})  
}, [])

if (!countries) { 
    return null 
  }
  console.log(countries)

const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
}
    
    
return(
<div>
    find countries 
    <input value={newFilter} onChange={handleFilterChange}/>
</div>    
)
}

export default App