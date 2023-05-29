"use client"
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import styles from '../styles/guessTheN.module.css';
import KeyboardReact from '../../compenents/KeyBoead';
import Swal from "sweetalert2"
function Page() {
  const [result, setResult] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(1);

  const array = [...Array(10).keys()];
  const [inputs, setInputs] = useState<{ [key: number]: string[] }>({ [counter]: ['', '', '', ''] });
  const inputRefs = useRef<Array<HTMLInputElement[]>>([]);

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
    console.log(value.length === 1 && index < inputs[counter].length - 1);
    console.log("index",index,"value",value );
    

    if (value.length === 1 && index < inputs[counter].length - 1) {
      setTimeout(() => {
        inputRefs.current[counter][index + 1].focus();
      }, 0);
    }
    
  };

  const verify = (arr: typeof inputs) => {
    console.log("mmmmmmmmmmmmm",arr);
    
    let space = arr[counter].indexOf('');
    Swal.fire
    if (space !== -1) {
      inputRefs.current[counter][space].focus();
    } else {
      arr[counter].forEach((e, i) => {
        if (result[i] === parseInt(inputRefs.current[counter][i].value)) {
          inputRefs.current[counter][i].style.backgroundColor = 'green';
          inputRefs.current[counter][i].style.color = 'black';
          inputRefs.current[counter][i].style.transform="rotateY(360deg)"
        } else if (result.includes(parseInt(inputRefs.current[counter][i].value))) {
          inputRefs.current[counter][i].style.backgroundColor = 'yellow';
          inputRefs.current[counter][i].style.color = 'black';
          inputRefs.current[counter][i].style.transform="rotateY(360deg)"
        } else {
          inputRefs.current[counter][i].style.backgroundColor = 'red';
          inputRefs.current[counter][i].style.color = 'black';
          inputRefs.current[counter][i].style.transform="rotateY(360deg)"
        }
      });
      // let test=true
      // let j=0
      // while(test){
      //   if(result.includes(arr))
      // }


      setCounter((prevCounter) => prevCounter + 1);

      // Create a new input array for the next round
      const newInputs = { ...arr, [counter + 1]: ['', '', '', ''] };
      setInputs(newInputs);

      // Initialize refs for the new input section
      inputRefs.current[counter + 1] = [];
    }
  };

  const addInputs = (inputCounter: number) => {
    if (!inputRefs.current[inputCounter]) {
      inputRefs.current[inputCounter] = [];
    }

    return (
      <div className={styles.inputs}>
        {inputs[inputCounter].map((inputValue, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[inputCounter][index] = el)}
            type="text"
            name=""
            value={inputValue}
            onChange={(event) => handleInputChange(index, event.target.value)}
          />
        ))}
      </div>
    );
  };

  const keyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      verify(inputs);
    }
  };

  return (
    <div className={styles.all} onKeyDown={keyDown}>
      <h1 className={styles.h1}>guess the number of 4 digits</h1>
      <div>
        {Array.from({ length: counter }, (_, index) => (
          <div key={index}>{addInputs(index + 1)}</div>
        ))}
      </div>
      <button style={{ display: 'none' }}></button>
      <KeyboardReact handleInputChange={handleInputChange} input={inputs[counter]} theAllObj={inputs}counter={counter} verify={verify} />
    </div>
  );
}

export default Page;
