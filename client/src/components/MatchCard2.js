import React from 'react'

const MatchCard2 = ({match}) => {
    return (
        <div className="card" style={{width: "18rem", margin: '10px'}}>
            <ul className="list-group list-group-flush text-center">
                <li className="list-group-item">Date: {match.matchDate.slice(0,11)}</li>
                <li className="list-group-item">Venue: {match.venue}</li>
                <li className="list-group-item">{match.team1} <br/>vs<br/> {match.team2}</li>
            </ul>
        </div>
    )
}

export default MatchCard2
