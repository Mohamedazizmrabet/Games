"use client"
import React, { useState, useEffect } from 'react';
import styles from '../styles/guessTheN.module.css';
import KeyboardReact from "../../compenents/KeyBoead";
import { type } from 'os';
function Page() {
  const [result, setResult] = useState<number[]>([]);
  const array = [...Array(10).keys()];
  const [inputs, setInputs] = useState<string[]>(["", "", "", ""]);
console.log(inputs);

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
console.log(result);

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };
  const verify=(arr:typeof inputs)=>{
    if(arr.includes("")) return false
    else{
      if(arr.includes("")){}
    }
  }

  const addInputs = () => (
    <div className={styles.inputs}>
      <input
        type="text"
        name=""
        id={styles.i1}
        value={inputs[0]}
        onChange={(event) => handleInputChange(0, event.target.value)}
      />
      <input
        type="text"
        name=""
        id={styles.i1}
        value={inputs[1]}
        onChange={(event) => handleInputChange(1, event.target.value)}
      />
      <input
        type="text"
        name=""
        id={styles.i1}
        value={inputs[2]}
        onChange={(event) => handleInputChange(2, event.target.value)}
      />
      <input
        type="text"
        name=""
        id={styles.i1}
        value={inputs[3]}
        onChange={(event) => handleInputChange(3, event.target.value)}
      />
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
      <KeyboardReact handleInputChange={ handleInputChange} input={inputs} />
    </div>
  );
}

export default Page;
