import logo from './assets/img/logo.svg';
import './assets/css/App.css';

import Formulario from './components/Formulario';
import Personas from './components/Personas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="title-app">
          Prueba Técnica ReactJs
        </p>
      </header>
      <body className="body-app">
        <main>
          <Formulario/>
          <br/>
          <hr/>
          <Personas/>
        </main>
      </body>
    </div>
  );
}

export default App;
