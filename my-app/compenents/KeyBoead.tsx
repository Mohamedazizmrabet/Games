import React, { useState, useRef, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import styles from "../app/styles/keyBoard.module.css"
interface KeyboardReactProps {
  addInputs: (inputs: string) => void;
  inputs: string[];
  setInputs: (inputs: string) => void;
  input: string;
  handleInputChange:any
  verify:Function
  counter:number
  theAllObj:any
}

const App: React.FC<KeyboardReactProps> = ({ theAllObj,counter, handleInputChange, input,verify }: KeyboardReactProps) => {
  console.log("input",input);
  
  const [layoutName, setLayoutName] = useState<string>('default');
  const [inputValue, setInputValue] = useState<string>('');

  const keyboardRef = useRef(null);
  const onUpdate=(str:string)=>{
    if(str==="enter") return verify(theAllObj)
    console.log(str);
    
    for(let i=0;i<input.length;i++){
    
      console.log(input[i],"i=",i);
      
      if(input[i]===""){
        
         return handleInputChange(i,str)
        
      }
    }
    
  }
  const onChange = (input: string) => {
    setInputValue(input);
    console.log('Input changed', input);
  };

  const onKeyPress = (button: string) => {
    onUpdate(button)
    console.log('Button pressed', button);

    if (button === '{shift}' || button === '{lock}') {
      handleShift();
    }
  };

  const handleShift = () => {
    setLayoutName((prevLayout) => (prevLayout === 'default' ? 'shift' : 'default'));
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputValue(input);
    keyboardRef.current?.setInput(input);
  };

  useEffect(() => {
    return () => {
      keyboardRef.current?.clearInput();
    };
  }, []);

  const keyboardLayouts = {
    default: [
      "1 2 3",
      "4 5 6",
      "7 8 9",
      "enter 0"
    ],
  
    theme: "hg-theme-default hg-layout-numeric numeric-theme"
  };
  

  return (
    <div className={styles.keyB}>
      <Keyboard 
        keyboardRef={(r) => (keyboardRef.current = r)}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
        layout={keyboardLayouts} // Use the custom keyboard layout
      />
    </div>
  );
};

export default App;
