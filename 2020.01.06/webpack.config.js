const path = require('path');

module.exports = {
  mode : 'development', //실무에는 production
  devtool : 'eval', //속도-빠르게 실무에는 hidden-source-map

  resolve : {
    extensions : ['.jsx', '.js']  //웹팩이 알아서 파일을 찾아준다.
  },

  entry : {   //입력파일
    app : ['./client'],
  },
  module : {  //입력파일들을 어떻게할건지
    rules : [{
      test : /\.jsx?$/, //test 우선순위
      loader : 'babel-loader',
      options : {
        presets : [ //플러그인의 모음,  플러그인 : 개발시 필요한 확장 프로그램
          ['@babel/preset-env', {
            targets : {
              browsers : ['last 2 chrome versions'],
            },
          }],
          '@babel/preset-react',
        ],
        plugins : ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel'],   //build === compile
      },
    }],
  },
  output : {  //출력파일
    filename : 'app.js',
    path : path.join(__dirname, 'dist'),    //여기에 app.js 만들어줌.
  },
};
