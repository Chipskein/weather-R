import React from 'react';
import './index.css'
import PinContainer from '../PinContainer'
import { GetAllCountries, GetAllStatesFromCountry, GetAllCitiesFromState} from '../../api'
import logo from '../../assets/icon.png'
import { useEffect,useState } from 'react';
export default function LocationSelector() {
  const [Countries, setCountries] = useState([]);
  const [Country, setCountry] = useState(null);
  const [States, setStates] = useState([]);
  const [State, setState] = useState(null);
  const [Cities, setCities] = useState([]);
  const [City, setCity] = useState(null);

  useEffect(()=>{
    ( async ()=>{
        const contries=await GetAllCountries()
        setCountries(contries)
      }
    )();
  },[])

  useEffect(()=>{
    ( async ()=>{
        if(Country==null) return;
        const states=await GetAllStatesFromCountry(Country.iso2)
        setStates(states)
      }
    )();
  },[Country])

  useEffect(()=>{
    ( async ()=>{
        if(Country==null||State==null) return;
        const cities=await GetAllCitiesFromState(Country.iso2,State.iso2)
        setCities(cities)
      }
    )();
  },[State])

  return (
    <div>
      <div className='div-logo'>
        <img src={logo} alt="logo" className='logo'/>
      </div>
      <div className='div-inputs'>
        <div>
          <div className='inputs'>
            <select
                className='inputs'
                name='country-list' 
                placeholder='Select a Country'
                onChange={(event)=>{
                  const select=event.target
                  const selectedIndex=select.selectedIndex
                  const selectedOption=select.options[selectedIndex]
                  const iso2=selectedOption.value
                  const name=selectedOption.text
                  setCountry(
                    {
                      name,
                      iso2
                    }
                  )
                }}
            
            >
                <option value={null}>Select a country</option>
                {
                  Countries.map((country,key)=>{
                    return(
                      <option key={key} value={country.iso2} >{country.name}</option>
                    )
                  })
                }
            </select>  
          </div>
          <div className='inputs'>
            <select 
                className='inputs'
                name='state-list' 
                placeholder='Select a State'
                onChange={(event)=>{
                  const select=event.target
                  const selectedIndex=select.selectedIndex
                  const selectedOption=select.options[selectedIndex]
                  const iso2=selectedOption.value
                  const name=selectedOption.text
                  setState(
                    {
                      name,
                      iso2
                    }
                  )
                }}
            >
                <option value={null}>Select a state</option>
                {
                  States.map((state,key)=>{
                    return(
                      <option key={key} value={state.iso2}>{state.name}</option>
                    )
                  })
                }
            </select>  
          </div>
          <div className='inputs'>
            <select 
                className='inputs'
                name='cities-list' 
                placeholder='Select a City'
                onChange={(event)=>{
                  const select=event.target
                  const selectedIndex=select.selectedIndex
                  const selectedOption=select.options[selectedIndex]
                  const name=selectedOption.text
                  setCity({
                    name,
                    CountryIso:Country.iso2,
                    StateIso:State.iso2,
                  })
                }}
            >
                <option value={null}>Select a City</option>
                {
                  Cities.map((city,key)=>{
                    return(
                      <option key={key}>{city.name}</option>
                    )
                  })
                }
            </select>  
          </div>
        </div>
      </div>
      <div>
          <PinContainer City={City}/>
      </div>
    </div>
  );
}


