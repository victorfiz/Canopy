import React, { useCallback, useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

function IDE({ currentIDECode, sweData }) {
  const [IDEPreCode, setIDEPreCode] = useState('');


  useEffect(() => {
    //listen to window for dom event setIDEPreCode



    window.addEventListener('set_ide_pre_code', (e) => {
      let code = e.detail.code.replace(/\\n/g, '\n');
      console.log('set_ide_pre_code unescaped', code);
      setIDEPreCode(code);
    });

    window.addEventListener('set_ide_swe_data', (e) => {
      let data = e.detail.data;

      sweData.current = data;

      console.log('sweData.current', sweData.current);


      // setIDEPreCode(code);
    }
    );
  }
    , []);



  const onChange = useCallback((value, viewUpdate) => {
    currentIDECode.current = value;
    console.log('value:', value);

    window.streamResponseSocket.send(
      JSON.stringify({
        message_type: 'IDE_code',
        ide_code_data: sweData.current,
      })
    
    )
  }, []);
  return (
    <CodeMirror
      // value={IDEPreCode}
      value={IDEPreCode}
      height="calc(100vh - 200px)"
      width='calc(100vw - 350px)'

      extensions={
        [python()]
      }
      onChange={onChange}

    />
  );
}
export default IDE;
