import { useRef, useState } from 'react'
import { addPlayer } from '../services/apiService';

const AddPlayerComponent = () => {
    const [player, setPlayer] = useState({ playerName: "", teamId: "", role: "", age: 0, matchesPlayed: 0 });

    const inputRefName = useRef();
    const inputRefTeamId = useRef();
    const inputRefRole = useRef();
    const inputRefAge = useRef();
    const inputRefPlayed = useRef();

    const onChange = (e) => {
        setPlayer({ ...player, [e.target.id]: e.target.value })
    }

    const insertPlayer = async () => {
        let result = await addPlayer(player);
        return result
    }

    const validate = async (e) => {
        e.preventDefault();
        let res = await insertPlayer();
        if(JSON.stringify(res) === 1){
            alert("Form Submitted")
        }
        console.log("Form Submittes");
        console.log("Player Added : " + JSON.stringify(res));
        inputRefName.current.value = '';
        inputRefTeamId.current.value = '';
        inputRefRole.current.value = '';
        inputRefAge.current.value = '';
        inputRefPlayed.current.value = '';
    }

    return (
        <div className='container'>
            <h3 className='text-center m-2'>Add a new Player</h3>
            <form className='form-group' onSubmit={validate}>
                <div>
                    Player Name: <input ref={inputRefName} className='form-control' value={player.playerName} onChange={onChange} type='text' id="playerName" minLength={1} maxLength={50} required={true} />
                </div>
                <div>
                    Team Id: <input ref={inputRefTeamId} className='form-control' value={player.teamId} onChange={onChange} type='number' id='teamId' required />
                </div>
                <div>
                    Role: <input ref={inputRefRole} className='form-control' value={player.role} onChange={onChange} type='text' id='role' minLength={1} maxLength={30} required />
                </div>
                <div>
                    Age: <input ref={inputRefAge} className='form-control' value={player.age} onChange={onChange} type='number' id='age' required />
                </div>
                <div>
                    Matches Played: <input ref={inputRefPlayed} className='form-control' value={player.matchesPlayed} onChange={onChange} type='number' id='matchesPlayed' required />
                </div>
                <button className='btn btn-primary m-2 p-2' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddPlayerComponent;