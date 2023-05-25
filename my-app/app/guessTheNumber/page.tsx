"use client"
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import styles from '../styles/guessTheN.module.css';
import KeyboardReact from '../../compenents/KeyBoead';

function Page() {
  const [result, setResult] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(1);

  const array = [...Array(10).keys()];
  const [inputs, setInputs] = useState<{ [key: number]: string[] }>({ [counter]: ['', '', '', ''] });
  const inputRefs = useRef<Array<HTMLInputElement[]>>([[]]);

  function makeTheNumberOfFourDigits() {
    const result = [];
    while (result.length !== 4) {
      let index = Math.floor(Math.random() * array.length);
      let number = array[index];
      if (unique(number, result)) result.push(number);
    }
    return result;
  }

  function unique(number: number, result: number[]) {
    return !result.includes(number);
  }

  useEffect(() => {
    const generatedResult = makeTheNumberOfFourDigits();
    setResult(generatedResult);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = { ...inputs };
    updatedInputs[counter][index] = value;
    setInputs(updatedInputs);

    if (value.length === 1 && index < inputs[counter].length - 1) {
      inputRefs.current[counter][index + 1].focus();
    }
  };

  const verify = (arr: typeof inputs) => {
    let space = arr[counter].indexOf('');

    if (space !== -1) {
      inputRefs.current[counter][space].focus();
    } else {
      arr[counter].forEach((e, i) => {
        if (result[i] === parseInt(inputRefs.current[counter][i].value)) {
          inputRefs.current[counter][i].style.backgroundColor = 'green';
          inputRefs.current[counter][i].style.color = 'black';
        } else if (result.includes(parseInt(inputRefs.current[counter][i].value))) {
          inputRefs.current[counter][i].style.backgroundColor = 'yellow';
          inputRefs.current[counter][i].style.color = 'black';
        } else {
          inputRefs.current[counter][i].style.backgroundColor = 'red';
          inputRefs.current[counter][i].style.color = 'black';
        }
      });

      // Increment counter
      setCounter((prevCounter) => prevCounter + 1);

      // Create a new input array for the next round
      const newInputs = { ...inputs, [counter]: ['', '', '', ''] };
      setInputs(newInputs);

      // Initialize refs for the new input section
      inputRefs.current[counter] = [];
    }
  };

  const addInputs = () => (
    <div className={styles.inputs}>
      {inputs[counter].map((inputValue, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[counter][index] = el)}
          type="text"
          name=""
          value={inputValue}
          onChange={(event) => handleInputChange(index, event.target.value)}
        />
      ))}
    </div>
  );

  const keyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      verify(inputs);
    }
  };

  return (
    <div className={styles.all} onKeyDown={keyDown}>
      <h1 className={styles.h1}>guess the number of 4 digits</h1>
      {result.map((e, i) => (
        <div className="" key={i}>
          {e}
        </div>
      ))}
      <div>
        {Array.from({ length: counter }, (_, index) => (
          <div key={index}>{addInputs()}</div>
        ))}
      </div>
      <button style={{ display: 'none' }}></button>
      <KeyboardReact handleInputChange={handleInputChange} input={inputs[counter]} />
    </div>
  );
}

export default Page;
