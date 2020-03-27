import React from 'react';

import './global.css';

import Routes from './routes';

function App() {
  
  //const [counter, setCounter] = useState(0);
  //function increment(){
  //  setCounter(counter +1);
  //}

  return (
    //<Header title="Semana OmniStack" />
    // ou   
    //<div>
    //  <Header>
    //    Contador: {counter}
    //  </Header>
    //  <button onClick={increment}>Incrementar</button>
    //</div>

    <div>
      <Routes />
    </div>
  );
}

export default App;
