import axios from 'axios'
const url = 'http://localhost:5128/api/Ipl';

async function getMatchStats() {
    let data = null;
    try {
        let response = await axios.get(`${url}/matchstats`);
        if (response.status === 200) {
            data = await response.data;
        }
    }
    catch (error) {
        return error;
    }
    return data;
}


const addPlayer = async (player) => {
    let data = null;
    try{
        let response = await axios.post(url, player);
        if(response.status === 200 && response.data !== null){
            data = await response.data;
        }
    }
    catch(error){
        return JSON.stringify(error);
    }
    return data
}

async function getMatchByDates(fromDate, toDate) {
    let data = null;
    try {
        let response = await axios.get(`${url}/matchbydates?fromDate=${fromDate}&toDate=${toDate}`);
        if (response.status === 200) {
            data = await response.data;
        }
    }
    catch (error) {
        return error;
    }
    return data;
}

const getHighestMatchedPlayedPlayer = async (player) => {
    let data = null;
    try {
        let response = await axios.get(`${url}/highestplayer`);
        if (response.status === 200) {
            data = await response.data;
        }
    }
    catch (error) {
        return error;
    }
    return data;
}

export {getMatchStats, addPlayer, getMatchByDates, getHighestMatchedPlayedPlayer };

