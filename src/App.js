import { useState } from 'react';
import './App.css';
import Password from './components/Password';
import Types from './components/Types';


function App() {
  const [password, setPassword] = useState('');

  const generatePassword = (checkboxes , rangeLength, randomFunc) => {
    //get checboxes'count that have value true
    const typesCount = Object.keys(checkboxes).filter(box => checkboxes[box]).length;
    if(typesCount === 0) {
      return;
    }
    //
    const typesObj = Object.keys(checkboxes).filter(box => checkboxes[box]).reduce((obj, key) => {
        obj[key] = checkboxes[key];
        return obj;
    }, {});

    let generatedPassword = '';
    for(let i=0; i< rangeLength; i++) {
        const index = i % typesCount;
        const funcName = Object.keys(typesObj)[index];
        generatedPassword += randomFunc[funcName]();
    }
    
    setPassword(generatedPassword);
}

  const changeOptions = () => {
    setPassword('');
  }
  return (
    <main className='main'>
      <h1 className='title'>Password Generator</h1>
      <Password password={password}/>
      <Types generatePassword={generatePassword} changeOptions={changeOptions}/>
    </main>
  );
}

export default App;
