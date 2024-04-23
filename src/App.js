import React, { Component } from "react";
import Form from "./components/Form";
import Weather from "./components/Weather";

const Api_Key = "584aac5f25c809224ccbe37bbc630b92";
// https://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=584aac5f25c809224ccbe37bbc630b92
class App extends Component {
  state = {
    tempreature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}}&appid=${Api_Key}`
      // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`
    );
    const data = await api.json();
    if (city && country) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        tempreature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "Please Enter City & Country",
      });
    }
    console.log(data);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather} />
          <Weather
            tempreature={this.state.tempreature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}
export default App;
