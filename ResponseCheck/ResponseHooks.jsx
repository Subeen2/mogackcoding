import React from 'react';
import {useState, useRef} from 'react';

const ResponseCheck= () =>{
  const [state,setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () =>{
    if(state === 'waiting'){
      setState('ready');
      setMessage('초록색 되면 클릭');
      timeout.current = setTimeout(()=>{
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      });
    }else if (state === 'ready'){
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 빨리누름');
    }else if (state === 'now'){
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작');
      setResult((prevResult)=>{
        return [...prevResult, endTime.current-startTime.current];
      });
    }
  };
  return(
      <>
        <div
        id="screen"
        className = {state}
        onClick={onClickScreen}
        > {message}
        </div>
        {result.length === 0
          ? null
          : <div>평균 시간 : {result.reduce((a+c)=>a+c)} / {result.length}ms</div>}
      </>
    );
};

export default ResponseHooks;
