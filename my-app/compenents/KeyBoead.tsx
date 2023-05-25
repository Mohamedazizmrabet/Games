import React, { useState, useRef, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import styles from "../app/styles/keyBoard.module.css"
interface KeyboardReactProps {
  addInputs: (inputs: string) => void;
  inputs: string;
  setInputs: (inputs: string) => void;
  input: string;
  handleInputChange:any
}

const App: React.FC<KeyboardReactProps> = ({ addInputs, inputs, handleInputChange, input }: KeyboardReactProps) => {
  
  const [layoutName, setLayoutName] = useState<string>('default');
  const [inputValue, setInputValue] = useState<string>('');

  const keyboardRef = useRef(null);
  const onUpdate=(str:string)=>{
    for(let i=input.length;i>=0;i--){
      console.log("i=",i);
      
      if(input[i]==="") handleInputChange(i,str)
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
    default: ["1 2 3", "4 5 6", "7 8 9", "0"],
   

  theme: "hg-theme-default hg-layout-numeric numeric-theme"
  }

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
