import { useState } from 'react'
import './App.css'
import ColorSlider from './ColorSlider.jsx'

function App() {
  //barevné složky RGB
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  async function saveColor() {
    try {
      //data, ktera budu ukladat
      const data = { red, green, blue };
      //nastaveni ukladaciho okna
      const opt = {
        //predvyplnene jmeno
        suggestedName: "barva.json",
        //podporovane typy souboru
        types: [
          {
            description: "JSON soubor",
            accept: { "application/json": [".json"], },
          },
        ]
      }

      //zobrazime ukladaci okno
      const file = await window.showSaveFilePicker(opt);

      //pripojime zapisovaci proud
      const zapisovac = await file.createWritable();
      //zapiseme data
      await zapisovac.write(JSON.stringify(data, null, "\t"));
      //uzavreme proud
      await zapisovac.close();

    }
    catch (err) {
      console.log("Chyba pri ukladani souboru: ", err);
    }
  }



  async function loadColor() 
  {
    try 
    {
      /* destruovani pole */
      //const [file] = await window.showOpenFilePicker();

      /* bez destruovani pole */
      const files = await window.showOpenFilePicker();
      const file = files[0];

      //z odkazu ziskame soubor
      const opravduFile = await file.getFile();
      //soubor prevedeme na text
      const text = await opravduFile.text();
      //tento string prevedeme na JSON
      const data = JSON.parse(text);

      setRed(data.red ?? 0);
      //setGreen(data.green ?? 0);
      if (data.green == null) 
      {
        setGreen(0);
      } 
      else 
      {
        setGreen(data.green);
      }
      setBlue(data.blue ?? 0);
    }
    catch (err) {
      console.log("Chyba pri nacitani souboru: ", err);
    }
  }

  return (
    <>
      <h1>React ColorMixer</h1>

      {/* posuvníky pro nastavení barevných složek RGB */}
      <div id="color_box" style={{ backgroundColor: "rgb(" + red + ", " + green + ", " + blue + ")" }}></div>

      {/* posuvníky */}
      <ColorSlider label="Red" value={red} func={setRed} />
      <ColorSlider label="Green" value={green} func={setGreen} />
      <ColorSlider label="Blue" value={blue} func={setBlue} />

      {/* tlačítka pro nastavení barevných složek RGB na 0 nebo 255 */}
      <button onClick={saveColor}>Uložit barvu</button>
      &nbsp;
      <button onClick={loadColor}>Načíst barvu</button>
    </>
  )
}

export default App
