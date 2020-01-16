import React from 'react';

function getWinNumbers(){
  const candidate = Array(45).fill().map((v,i)=>i+1);
  const shuffle = [];
  while(candidiate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length -1];
  const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
  return [...winNumbers, bonusNumber];
}




class Lotto extends React.Component {
  state = {
    winNumbers:getWinNumbers(),
    winBalls:[],
    bonus:null,
    redo:false,
  };

  timeouts = [];

  runTimeouts = () =>{
    const {winNumbers} = this.state;
    for(let i=0; i<this.state.winNumbers.length -1; i++){
      this.timeouts[i] = setTimeout(()=>{
        this.setState((prevState)=>{
          return{
          winBalls:[...prevState.winBalls,winNumbers[i]],
        }
        });
      }, (i+1)*1000);
    }
    this.timeouts[6] = setTimeout(()=>{
      this.setState({
        bonus:winNumbers[6],
        redo:true,  //보너스 번호까지 다 나왔으면 다시 버튼 보이게
      });
    }, 7000);
  }

  componentDidMount(){  //let이 클로저문제 안생김
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.winBalls.length === 0){
      this.runTimeouts();
    }
  }

  componentWillUnmount(){
    this.timeouts.forEach((v)=>{
      clearTimeout(v);
    });
  }


  onClickRedo = () =>{
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo:false,
    });
    this.timeouts = [];
  };



 render(){
   const { winBalls , bonus, redo} = this.state;
   return (
     <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v)=><Ball key={v} number={v}/>)}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus}/>}
      {redo && <button onClick={this.onClickRedo}>한번 더 </button>}
     </>
   );
 }
}

export default Lotto;
