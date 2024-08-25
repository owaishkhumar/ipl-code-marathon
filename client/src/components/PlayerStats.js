import { useEffect, useState } from 'react'
import { getHighestMatchedPlayedPlayer } from '../services/apiService';

const PlayerStats = () => {
    const [players, setPlayers] = useState([]);

    const getData = async () => {
        let data = await getHighestMatchedPlayedPlayer();
        if (data != null && !data.message) {
            setPlayers(data);
        }
        else {
            setPlayers([]);
        }
    }

    useEffect(() => {
        getData();

    }, [])
    console.log(players);

    return (
        <table className='table table-bordered table-striped'>
            <thead className='bg-success border-0 rounded text-white'>
                <tr><th>Name</th><th>Matched Played</th><th>Fan Engagement</th></tr>
            </thead>
            <tbody className='bg-info border-0'>
                {players.map(m =>  (
                    <tr>
                        <td><b>{m.playerName}</b></td>
                        <td>{m.matchesPLayed}</td>
                        <td>{m.fanEngagement}</td>
                    </tr>)
                )}
            </tbody>

        </table>
    )
}

export default PlayerStats
