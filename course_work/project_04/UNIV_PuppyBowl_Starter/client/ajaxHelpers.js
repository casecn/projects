// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2303-ftb-web-pt';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;



export const fetchAllPlayers = async () => {
    let apiURL = `${APIURL}players`;
    try {
        const response = await fetch (apiURL);
        const jsonData = await response.json();
        if(jsonData.error){
            throw jsonData.error;
        }
        return jsonData.data.players
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
};

export const fetchSinglePlayer = async (playerId) => {
    let apiURL = `${APIURL}/players/${playerId}`;
    try{
        const playerData = await fetch (apiURL);
            
        const playerJSON = await playerData.json();
        let response = playerJSON.data.player;
        if(playerJSON.error){
            throw playerJSON.error;
        }
        return response;
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
};

export const addNewPlayer = async (playerObj) => {
    try{
        const apiOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerObj)
        }
        const response = await fetch(`${APIURL}/players`, apiOptions);
        const result = await response.json();
        return result;
    }catch (error){
        console.error(error);
    }
};

export const removePlayer = async (playerId) => {
    try{
        const apiOptions = {
            method: 'DELETE'};
        const response = await fetch (`${APIURL}/players/${playerId}`, apiOptions);
        const result = await response.json();
        console.log(result);
    }catch (error){
        console.error(error);
    }
};


