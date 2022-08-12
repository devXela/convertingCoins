import React from "react"

function App() {
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
    <div className="App row">
      <h1 className="text-center">Convertendo REAL</h1>
      <p className="text-center">Digite o valor para ser convertido e selecione entre: <span className="text-black-50">EURO</span>, <span className="text-black-50">Libras Esterlinas</span>, <span className="text-black-50">Dólar</span> ou <span className="text-black-50">Peso Argentino</span></p>
        <form onSubmit={convertCoin} className="offset-1 col-sm-10">
          <div>
            <p className="mt-2 text-danger">{msgError == false ? 'Digite o valor a ser convertido ou selecione a moeda que será usada na conversão' : null}</p>
          </div>
          <div className="mb-3">
            <label for="valueToConvert">Valor em BRL</label>
            <input 
              type="number" 
              id="valueToConvert" 
              className="form-control"
              name="valueToConvert" 
              placeholder="Digite o valor em real a ser convertido" 
              onChange={(e) => setValueToConvert(e.target.value)}/>
          </div>
          <div>
            <label for="coin">Moeda para conversão</label>
            <select 
              id="coin" 
              className="form-control"
              name="coin" 
              onChange={(e) => setCoin(e.target.value)}>
                <option value=''>Selecione a moeda que o valor será convertido</option>
                <option value='EUR'>Euro</option>
                <option value='USD'>Dolar</option>
                <option value='ARS'>Peso Argentino</option>
                <option value='GBP'>Libras Esterlinas</option>
            </select>
          </div>
          <div className="mt-3">
            <input className="btn btn-primary" type="submit" value="Converter" />
          </div>
          <div className="row">
            <p className="mt-3 col-sm-9">{!valueConverted ? "" : (valueConverted === '0' ? <span className="text-warning">Convertendo...</span> : <span className="text-success">O valor convertido foi: ${valueConverted}</span>)}</p>
          </div>
        </form>
        <div className="row">
          <img src={sourceOfScreenshot !== null ? '/printsOfConversions' + sourceOfScreenshot : ''} style={{ visibility: visible ? "visible" : "hidden" }} alt="Print da conversão"/>
        </div>      
    </div>
  );
}

export default App;