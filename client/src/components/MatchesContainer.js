import React, { useEffect, useState } from 'react'
import MatchCard from './MatchCard'
import { getMatchStats } from '../services/apiService';

const MatchesContainer = () => {
    const [matches, setMatches] = useState([]);

    
    useEffect(() => {
        const getData = async () => {
            let data =  await getMatchStats();
            if (data != null && !data.message) {
                setMatches(data);
            }
            else {
                setMatches([]);
            }
        }
        getData();
    }, [])
    return (
        <>
            <h2 className='text-center'>Matches</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {matches.map((m, i) => <MatchCard key={i} match={m} />)}
            </div>
        </>
    )
}

export default MatchesContainer
