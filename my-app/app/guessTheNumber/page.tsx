"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/guessTheN.module.css';
import KeyboardReact from "../../compenents/KeyBoead";

function Page() {
  const [result, setResult] = useState<number[]>([]);
  const array = [...Array(10).keys()];
  const [inputs, setInputs] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

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
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);

    if (value.length === 1 && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const addInputs = () => (
    <div className={styles.inputs}>
      {inputs.map((inputValue, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          name=""
          id={styles.i1}
          value={inputValue}
          onChange={(event) => handleInputChange(index, event.target.value)}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.all}>
      <h1 className={styles.h1}>guess the number of 4 digits</h1>
      {result.map((e, i) => {
        return (
          <div className="" key={i}>
            {e}
          </div>
        );
      })}
      {addInputs()}
      <button style={{display:"none"}}></button>
      <KeyboardReact handleInputChange={handleInputChange} input={inputs} />
    </div>
  );
}

export default Page;
