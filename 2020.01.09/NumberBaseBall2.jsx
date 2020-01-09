import React from 'react';
import Try from './Try';

function answer(){
  const array = [1,2,3,4,5,6,7,8,9];
  const answer = [];
  for(let i=0; i<4; i++){
    const chosen = array.splice(Math.floor(Math.random()*(9-i)),1)[0];
    answer.push(chosen);
  }
  return answer;
}

class NumberBaseBall2 extends React.PureComponent {
  state = {
    value : '',
    answer: answer(),
    tries: [],
    result:'',
  }

  onSubmit = (e) =>{
    e.preventDefault();
    if(this.state.value === this.state.answer.join('')){  //join은 배열의 값을 다 출력해주는 함수
      this.setState({
        result: '홈런',
        tries:[...this.state.tries, {tries:this.state.value, result:'홈런'}],
        value:'',
      });
    }else{
      const answerArray = this.state.value.split('').map((v)=> parseInt(v));
      let strike= 0;
      let ball = 0;
      if(this.state.tries.length >= 9){
        this.setState({
          result : `10번 틀렸습니다. 답은 ${this.state.answer.join('')}입니다.`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          answer:answer(),
          value:'',
          tries:[],
        });
      }else{
        for(let i=0; i<4; i++){
          if(answerArray[i]===this.state.answer[i]){
            strike += 1;
          }else if(this.state.answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        this.setState({
          tries: [...this.state.tries,{tries:this.state.value, result:`${strike}스트라이크, ${ball}볼`}],
          value:'',
        });
      }
    }
  }


  render(){
    return(
      <div>
      <div><b>{this.state.result}</b></div>
      <form onSubmit={this.onSubmit}>
        <input maxLength="4" onChange={(e)=>{this.setState({value:e.target.value})}} />
        <button type="submit">입력</button>
      </form>
      <div>시도 횟수 : {this.state.tries.length} </div>
      <ul>
        {this.state.tries.map((v)=> {
          return (
            <Try key={v.tries + v.result} value={v}/>
          );
        })}
      </ul>
      </div>
    );
  }
}

export default NumberBaseBall2;
