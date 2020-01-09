import React from 'react';



class Try extends React.Component {
  render(){
    return (
      <div>
      <li>{this.props.value.tries}</li>
      <li>{this.props.value.result}</li>
      </div>
    );
  }
}

export default Try;
