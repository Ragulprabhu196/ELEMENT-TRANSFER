import React, { useState } from 'react';
import './App.css'; 

function ElementTransfer() {
  const [bucket1Elements, setBucket1Elements] = useState(['Item 1', 'Item 2', 'Item 3','Item 4', 'Item 5', 'Item 6']); 
  const [bucket2Elements, setBucket2Elements] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const addToBucket2 = () => {
    if (selectedElements.length === 0) {
      setErrorMessage('Please select items to transfer.');
      return;
    } else if (selectedElements.some(elem => bucket2Elements.includes(elem))) {
      setErrorMessage('Cannot transfer items that already exist in Bucket 2.');
      return;
    }
    
    setBucket2Elements(prev => [...prev, ...selectedElements]);
    const remainingElements = bucket1Elements.filter(elem => !selectedElements.includes(elem));
    setBucket1Elements(remainingElements);
    setSelectedElements([]);
    setErrorMessage('');
  };

  const addToBucket1 = () => {
    if (selectedElements.length === 0) {
      setErrorMessage('Please select items to transfer.');
      return;
    } else if (selectedElements.some(elem => bucket1Elements.includes(elem))) {
      setErrorMessage('Cannot transfer items that already exist in Bucket 1.');
      return;
    }

    setBucket1Elements(prev => [...prev, ...selectedElements]);
    const remainingElements = bucket2Elements.filter(elem => !selectedElements.includes(elem));
    setBucket2Elements(remainingElements);
    setSelectedElements([]);
    setErrorMessage('');
  };

  const addAllToBucket2 = () => {
    setBucket2Elements(prev => [...prev, ...bucket1Elements]);
    setBucket1Elements([]);
    setSelectedElements([]);
  };

  const addAllToBucket1 = () => {
    setBucket1Elements(prev => [...prev, ...bucket2Elements]);
    setBucket2Elements([]);
    setSelectedElements([]);
  };

  const selectElement = (element) => {
    setSelectedElements(prev => {
      if (prev.includes(element)) {
        return prev.filter(elem => elem !== element);
      } else {
        return [...prev, element];
      }
    });
  };

  return (
    <div className="container">
      <div className="bucket">
        <h2>Bucket 1</h2>
        <div className="items">
          {bucket1Elements.map((element, index) => (
            <div key={index} className={`item ${selectedElements.includes(element) ? 'selected' : ''}`} onClick={() => selectElement(element)}>
              {element}
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        <button onClick={addToBucket2}>Add to Bucket 2</button>
        <button onClick={addToBucket1}>Add to Bucket 1</button>
        <button onClick={addAllToBucket2}>Add All to Bucket 2</button>
        <button onClick={addAllToBucket1}>Add All to Bucket 1</button>
      </div>
      <div className="bucket">
        <h2>Bucket 2</h2>
        <div className="items">
          {bucket2Elements.map((element, index) => (
            <div key={index} className={`item ${selectedElements.includes(element) ? 'selected' : ''}`} onClick={() => selectElement(element)}>
              {element}
            </div>
          ))}
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default ElementTransfer;
