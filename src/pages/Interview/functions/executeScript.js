import axios from 'axios';

export async function makePostRequest(data) {

    console.log("makePostRequest", data)
    try {


        console.log("LAPPY data", data)
    
        const response = await axios.post(
            // 'https://us-central1-humanview-d6bc8.cloudfunctions.net/code_execute_runtime',
            "http://localhost:8082",
             data
        );

        const resultsArray = response.data.results;

        console.log("resultsArray", resultsArray)


    let firstFailure = null
    let isAllPassed = true;

    resultsArray.forEach((result) => {
        if(result.status === "failed"){
            firstFailure = result;
            isAllPassed = false;
        }
    })


    


    return {
        firstFailure,
        isAllPassed, 
        terminalDisplay: resultsArray[0].script_output
    }



    } catch (error) {
        console.error(error);
    }
}