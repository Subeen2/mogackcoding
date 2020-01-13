import React from 'react';

class ResponseCheck extends React.Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작',
    result:[],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const{ state, message, result } = this.state;
    if(state == 'waiting'){ //파
      this.setState({
        state: 'ready',   //빨
        message:'초록색일때 클릭하세요',
      });
     this.timeout = setTimeout(()=>{    //초
       this.setState({
         state:'now',
         message:'지금 클릭',
       });
      this.startTime = new Date();
    },Math.floor(Math.random()*1000) + 2000);
  }else if (state === 'ready'){
      clearTimeout(this.timeout); //timeout 없앰
      this.setState({
        state:'waiting',
        message:'넘 빨리누름',
      });
    }else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prevState) =>{
        return {
          state: 'waiting',
          message:'클릭해서 시작',
          result:[...prevState.result, this.endTime-this.startTime],
        };
      });
    }
  };

  render(){
    const {state, message, result} = this.state;
    return (
      <>
        <div
        id="screen"
        className = {state}
        onClick={this.onClickScreen}
        > {message}
        </div>
        {result.length === 0
          ? null
          : <div>평균 시간 : {result.reduce((a,c)=>a+c) / result.length}ms</div>}
      </>
    );
  }
}

export default ResponseCheck;
