"use client"
import React, { useState, useEffect, useRef,KeyboardEvent } from 'react';
import styles from '../styles/guessTheN.module.css';
import KeyboardReact from "../../compenents/KeyBoead";

function Page() {
  let counter=0
  const [result, setResult] = useState<number[]>([]);
  const array = [...Array(10).keys()];
  const [inputs, setInputs] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [divCount,setDivCount]=useState<number>(1)
  function makeTheNumberOfFourDigits() {
    const result = [];
    while (result.length !== 4) {
      let index = Math.floor(Math.random() * array.length);
      let number = array[index];
      if (unique(number, result)) result.push(number);
    }
    return result;
  }

  const appendDiv = () => {
    setDivCount(prevCount => prevCount + 1);
  };
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
  const verify = (arr: typeof inputs) => {
    let space = arr.indexOf("");
  
    if (space !== -1) {
      inputRefs.current[space].focus();
    } else {
      arr.forEach((e, i) => {
        if (result[i] === parseInt(inputRefs.current[i].value)) {
          inputRefs.current[i].style.backgroundColor = "green";
          inputRefs.current[i].style.color = "black";
        }
        else if(result.includes(parseInt(inputRefs.current[i].value))){
          inputRefs.current[i].style.backgroundColor = "yellow";
          inputRefs.current[i].style.color = "black";
        }
        else{
          inputRefs.current[i].style.backgroundColor = "red";
          inputRefs.current[i].style.color = "black";
        }
        return addInputs()
        
      });
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
          value={inputValue}
          onChange={(event) => handleInputChange(index, event.target.value)}
        />
      ))}
    </div>
  );
const keyDown=(event:KeyboardEvent)=>{
  console.log("key",typeof(event.key),event.key)
  if(event.key==="Enter")  {verify(inputs)}
  
}
  return (
    <div className={styles.all} onKeyDown={keyDown}>
      <h1 className={styles.h1}>guess the number of 4 digits</h1>
      {result.map((e, i) => {
        return (
          <div className="" key={i}>
            {e}
          </div>
        );
      })}
        <div>
        {Array.from({ length: divCount }, (_, index) => (
          <div key={index}>{addInputs()}</div>
        ))}
      </div>
      <button style={{display:"none"}}></button>
      <KeyboardReact handleInputChange={handleInputChange} input={inputs} />
      
    </div>
  );
}

export default Page;
