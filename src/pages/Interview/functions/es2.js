import { httpsCallable } from 'firebase/functions';
import { functions } from "../../../firebase";

const codeExecutionRuntime = httpsCallable(functions, 'code_execute_runtime');

export async function makePostRequest(data) {

    console.log("data", data)

    const resultData = await codeExecutionRuntime(data);

    console.log("resultData", resultData)

    // const resultData = {
    //     "results": [
    //         {
    //             "expected_output": "1",
    //             "output": "2",
    //             "printed_output": "4",
    //             "status": "passed",
    //             "test_case_id": "UJhJrbnLab26YkpHxGXD"
    //         },
    //         {
    //             "expected_output": "5",
    //             "output": "5",
    //             "printed_output": "4",
    //             "status": "passed",
    //             "test_case_id": "UV6DNgLTEQJqHVHwfxGG"
    //         },
    //         {
    //             "expected_output": "-1",
    //             "output": "-1",
    //             "printed_output": "4",
    //             "status": "passed",
    //             "test_case_id": "X9rWr71NHAfcgI0dDLpE"
    //         },
    //         {
    //             "expected_output": "5",
    //             "output": "5",
    //             "printed_output": "4",
    //             "status": "passed",
    //             "test_case_id": "wiHvG7tP47LVsf3rBtN0"
    //         }
    //     ]
    // }

    //extract the tests

    const {results} = resultData;

    let firstFailure = null
    let isAllPassed = true;

    results.forEach((result) => {
        if(result.expected_output !== result.output){
            firstFailure = result;
            isAllPassed = false;
        }
    })


    return {
        firstFailure,
        isAllPassed, 
        terminalDisplay: "This is a string"
    }
    
}


