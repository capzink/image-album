import React, { useState, useEffect } from "react";
import "./App.css";
import images, { data } from "./images";

export default function App() {
  const imagesList = data;
  const [currentList, setCurrentList] = useState();
  const [historicList, setHistoricList] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    generateRandomList();
  }, []);

  useEffect(() => {
    if (counter === 5) addHistoric();
  }, [counter]);

  function addHistoric() {
    setTimeout(() => {
      setHistoricList(historicList.concat(currentList));
      generateRandomList();
      setCounter(0);
    }, 1000);
  }

  function generateRandomList() {
    let newList = {
      isComplete: false,
      data: [],
    };
    for (let index = 0; index < 5; index++) {
      const randomIndex = Math.floor(Math.random() * (9 - 0 + 1));
      let newObj = {
        id: imagesList[randomIndex].name + index,
        url: imagesList[randomIndex].url,
        isVisible: false,
      };
      newList.data.push(newObj);
    }
    setCurrentList(newList);
  }

  const handleClick = (id) => {
    
    const newData = currentList.data.map((item) => {
      if (item.id === id) item.isVisible = true;
      
      if (item.isVisible) setCounter(counter + 1);
      return item;
    });
    setCurrentList({ ...currentList, data: newData });
  };

  return (
    <div className="container">
      <h1> Pokemon </h1>
      <div className="rowup">
        {currentList
          ? currentList.data.map((item) => (
              <div key={item.id} className="col">
                {item.isVisible ? (
                  <img src={item.url} alt={item.id} className="image" />
                ) : (
                  <div
                    className="square"
                    onClick={() => handleClick(item.id)}
                  ></div>
                )}
              </div>
            ))
          : null}
      </div>
      {historicList.map((item, index) => (
        <div key={index} className="rowup">
          {item.data.map((image) => (
            <div key={image.id} className="col">
              <img src={image.url} alt={image.id} className="image" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
