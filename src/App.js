import React from 'react';
import Routes from './routes';
import './style.css';

const App = () =>(
  // state = {
  //   emails: []
  // }
  
  // async componentDidMount(){
  //   const response = await api.get('/');
  //   this.setState({ emails: response.data});
  // }
  <div className="App">
    <Routes />
  </div>
)

export default App;
