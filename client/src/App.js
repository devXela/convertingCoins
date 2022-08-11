import React from "react"
import logo from './logo.svg';
import './App.css';

function App() {
  // const [data, setData] = React.useState(null);
  const [valueToConvert, setValueToConvert] = React.useState(null);
  const [coin, setCoin] = React.useState(null);
  const [valueConverted, setValueConverted] = React.useState(null);
  const [sourceOfScreenshot, setSourceOfScreenshot] = React.useState(null);
  


  let convertCoin = async (e) => {
    e.preventDefault();
    setValueConverted('')
    try {
      let res = await fetch("/convertCoin", {
        method: 'POST',
        mode: 'cors',
        cache:  'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coin: coin,
          valueToConvert: valueToConvert
        })
      });

      let resJson = await res.json()
      
      if (resJson.status === 200) {
        console.log(resJson)
        setValueConverted(resJson.valueConverted)
        setSourceOfScreenshot(resJson.sourceOfScreenshot)
      }
   
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
        <form onSubmit={convertCoin}>
          <div>
            <input 
              type="text" 
              id="valueToConvert" 
              name="valueToConvert" 
              placeholder="Digite o valor em real a ser convertido" 
              onChange={(e) => setValueToConvert(e.target.value)}/>
          </div>
          <div>
            <select 
              id="coin" 
              name="coin" 
              onChange={(e) => setCoin(e.target.value)}>
                <option value=''>Selecione a moeda que o valor será convertido</option>
                <option value='EUR'>Euro</option>
                <option value='USD'>Dolar</option>
                <option value='ARS'>Peso Argentino</option>
                <option value='GBP'>Libras Esterlinas</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Converter" />
          </div>
        </form>
        <div>
          <p>{!valueConverted ? "Convertendo..." : "O valor convertido foi: " + valueConverted}</p>
        </div>
        <div>
          <img src={sourceOfScreenshot === '' ? 'convertedPrints/' + sourceOfScreenshot : ''} width="1280" />
        </div>
      </body>
      
    </div>
  );
}

export default App;