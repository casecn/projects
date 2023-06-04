import logo from "./logo.svg";
import axios from "axios";
import City from "./components/City/City";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: "https://api.openweathermap.org/data/2.5/weather?q=Portland&appid=884cfd64f3a52a3354c76c381207cf1e",
    };

    axios
      .request(config)
      .then((response) => {
        setWeather(response.data.main);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="App">
      <City weather={weather}/>
    </div>
  );
};

export default App;