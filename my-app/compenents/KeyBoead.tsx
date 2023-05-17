import React, { useState, useRef, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const App: React.FC = ({addInputs}:) => {
  const [layoutName, setLayoutName] = useState<string>('default');
  const [input, setInput] = useState<string>('');

  const keyboardRef = useRef(null);

  const onChange = (input: string) => {
    setInput(input);
    console.log('Input changed', input);
  };

  const onKeyPress = (button: string) => {
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
    setInput(input);
    keyboardRef.current?.setInput(input);
  };

  useEffect(() => {
    return () => {
      keyboardRef.current?.clearInput();
    };
  }, []);

  return (
    <div>
      <input
        value={input}
        placeholder="Tap on the virtual keyboard to start"
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={(r) => (keyboardRef.current = r)}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default App;
