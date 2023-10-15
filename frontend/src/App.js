import React, { useState } from "react";
import './App.css';
import axios from 'axios';

function App() {
  //const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [randomName, setRandomName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    axios.post("/api/restaurant/addRestaurant", { name: name })
      .then((response) => {
        setMsg(response.data.message);
        setName("");
        // Set a timeout to clear the message after 2 seconds
        setTimeout(() => {
          setMsg("");
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle 400 Bad Request here
          console.error("Bad Request:", error.response.data.message);
  
          // Display the error message
          setMsg(error.response.data.message);
  
          // Set a timeout to clear the message after 2 seconds
          setTimeout(() => {
            setMsg("");
          }, 2000);
        } else {
          // Handle other errors
          console.error("Error:", error);
        }
      });
  };
  

  const handleRandom = () => {
    axios.get("/api/restaurant/getRandomRestaurant", {})
      .then((response) => {
        setRandomName(response.data.name);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Restaurant Finder</p>

        <input
          type="text"
          placeholder="Add a Restaurant"
          value={name}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <p>{!msg ? "" : msg}</p>
        <p>Click below to get a Random Restaurant</p>
        <button onClick={handleRandom}>Click</button>
        <p>{!randomName ? "" : randomName}</p>
      </header>
    </div>
  );
}

export default App;
