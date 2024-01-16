import React, { useState, useRef } from 'react';
import { makePostRequest } from '../functions/executeScript'
import Button from "../../../components/button/Button";
import IDE from './IDE';
import Footer from '../../../components/footer/Footer';


const FullIDE = ({
    isIDEOpen, setIsIDEOpen, 
}) => {
    const currentIDECode = useRef("");
    const sweData = useRef(null);
    const [terminalDisplay, setTerminalDisplay] = useState("TERMINAL")

  const handleRunClick = async () => {
    console.log("run button clicked");
    console.log(currentIDECode.current);
    const executionData = {
      code: currentIDECode.current,
      question_id: sweData.current.question_swe_id,
      method_name: sweData.current.question_swe_def
    };

    const requestMade = await makePostRequest(executionData);

    console.log("requestMade", requestMade);

    const { terminalDisplay, isAllPassed, firstFailure} = requestMade;

    window.streamResponseSocket.send(JSON.stringify({
      code: currentIDECode.current,
      message_type: "IDE_data",
      is_all_passed: isAllPassed,
      firstFailure,
    }));

    if (!isAllPassed) {
      setTerminalDisplay(
        terminalDisplay + '\n' +'FAILED' + '\n' + "Test Case:" + firstFailure.input_data + '\n' + "Expected Output:" + firstFailure.expected_output + '\n' + "Returned Output:" + firstFailure.return_output
      );
    } else {
      setTerminalDisplay(
        terminalDisplay+'PASSED' + '\n'
      );
    }

    if(isAllPassed){
      window.streamResponseSocket.send(JSON.stringify({
        message_type: "transcript",
        created_at: Date.now(),
        transcript_content_present:false,
      }));
    }
    console.log("requestMade", requestMade);
  };

  return (
    <div className='ide-container'>
      <IDE
        currentIDECode={currentIDECode}
        sweData={sweData}
      />
      <Footer> 
      <Button 
      type='primary'
      size='small'
      text='Run'
      onPress={handleRunClick}>
      </Button>

      <div className='ide-rhs'></div>
      <button className='ml-4 text-lgray ide-toggle-button' onClick={() => setIsIDEOpen(!isIDEOpen)}>
        <div className='code-icon sub-int-ic'></div>
        <div className='report-text'>Toggle IDE</div>
      </button>
      </Footer>
      <div className='ide-subprocess-container'>
        {terminalDisplay.split('\n').map((item, i) => (
          <p key={i} className={item==="FAILED"|| item==="PASSED" ? item==="FAILED"? "color-red":"color-green" : ""}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default FullIDE;