import React, { useState } from 'react'
import { getMatchByDates } from '../services/apiService';
import MatchCard2 from './MatchCard2';

const FilterMatched = () => {
    const [matches, setMatches] = useState([]);
    const [fromDate , setFromDate] = useState('');
    const [toDate , setToDate] = useState('');
    console.log(fromDate);
    console.log(toDate);
    
    
    const validate = async (e) => {
        e.preventDefault();
        let data = await getMatchByDates(fromDate, toDate);
        if (data != null && !data.message) {
            setMatches(data);
            console.log(data);
            
        }
        else {
            setMatches([]);
        }
        
    }
    
    
    
    return (
        <>
        <div className='m-2 p-2'>
            <label>Filter by dates</label>
            <form className='form-group' onSubmit={validate}>
                <div>
                    From: <input className='form-control' type='date' onChange={(e) => setFromDate(e.target.value)} required={true} />
                </div>
                <div>
                    To: <input className='form-control' type='date' onChange={(e) => setToDate(e.target.value)} required={true} />
                </div>
                <button className='btn btn-primary m-2 p-2' type='submit'>Filter</button>
            </form>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center' }}>
                {matches.map((m, i) => <MatchCard2 key={i} match={m}  />)}
            </div>
        </div>
        </>
    )
}

export default FilterMatched
