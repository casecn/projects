import React from "react";

const City = ({ weather }) => {
  return (
    <div>
      {weather ? (
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{weather.feels_like}</h5>
            <p className="card-text">The pressure is {weather.temp_max}.</p>
            <a href="#" className="btn btn-primary">
              Pressure is {weather.humidity}
            </a>
          </div>
        </div>
      ) : <p>No Data!</p>
      }
    </div>
  );
};

export default City;