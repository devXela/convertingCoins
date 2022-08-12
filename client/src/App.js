import React from "react"
import logo from './logo.svg';
import './App.css';

function App() {
  // const [data, setData] = React.useState(null);
  const [valueToConvert, setValueToConvert] = React.useState(null);
  const [coin, setCoin] = React.useState(null);
  const [valueConverted, setValueConverted] = React.useState(null);
  const [sourceOfScreenshot, setSourceOfScreenshot] = React.useState(null);
  const [visible, setVisible] = React.useState(null);
  const [msgError, setMsgError] = React.useState(null);
  

  let convertCoin = async (e) => {
    e.preventDefault();
    if ( 
      valueToConvert === '' ||
      valueToConvert === null ||
      coin === null
    ) {
      setMsgError(false)
      setVisible(false);
      setValueConverted('');

    } else {
      setMsgError(null)
      setValueConverted('0');
      setVisible(false);
      setSourceOfScreenshot('');
  
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
          setSourceOfScreenshot(resJson.screenshot)
          setVisible(true)
        }
     
      } catch (err) {
        console.error(err);
      }
    }

  };

  return (
    <div className="App">
        <form onSubmit={convertCoin}>
          <div>
            <input 
              type="number" 
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
          <div>
            <p>{msgError == false ? 'Digite o valor a ser convertido ou selecione a moeda que será usada na conversão' : null}</p>
          </div>
        </form>
        <div>
          <p>{!valueConverted ? "" : (valueConverted === '0' ? "Convertendo..." : "O valor convertido foi: " + valueConverted)}</p>
        </div>
        <div>
          <img src={sourceOfScreenshot !== null ? '/printsOfConversions' + sourceOfScreenshot : ''} style={{ visibility: visible ? "visible" : "hidden" }} alt="Print da conversão"/>
        </div>      
    </div>
  );
}

export default App;