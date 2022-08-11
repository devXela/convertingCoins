import React from "react"
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);
  const [valueToConvert, setValueToConvert] = React.useState(null);
  const [valueConverted, setValueConverted] = React.useState(null);
  // const [printOfConvertedCoin, printOfConvertedCoin] = React.useState(null);
  
  // React.useEffect(() => {
  //   fetch("/api")
  //   .then((res) => res.json())
  //   .then((data) => setData(data.message));
  // }, []);
  
  let convertCoin = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/convertCoin/" + valueToConvert, {
        method: "POST",
        body: JSON.stringify({
          valueToConvert: valueToConvert
        })
      });
      let resJson = await res.json()
      if (resJson.status == 200) {
        console.log(resJson)
        setValueConverted("sdf")
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
      <body>
        <form onSubmit={convertCoin}>
          <div>
            <input 
              type="text" 
              id="valueToConvert" 
              name="valueToConvert" 
              placeholder="Digite o valor a ser convertido" 
              onChange={(e) => setValueToConvert(e.target.value)}/>
          </div>
          <div>
            <input type="submit" value="Converter" />
          </div>
        </form>
        <div>
          <p>{!valueConverted ? "Convertendo..." : valueConverted}</p>
        </div>
      </body>
      
    </div>
  );
}

export default App;