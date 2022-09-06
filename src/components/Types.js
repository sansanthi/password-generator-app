import { useEffect, useState, createRef } from 'react';
import Arrow from '../assets/images/icon-arrow-right.svg';
import Strength from './Strength';


export default function Types(props) {
    const [inputStyle, setInputStyle] = useState({bgStyle: {background: '#000'}});
    const [rangeLength, setRangeLength] = useState(10);
    const [checkboxes, setCheckboxes] = useState({
        uppercase: true,
        lowercase: true,
        number: true,
        symbol: false
    });
    const [strengthType, setStrengthType] = useState('');
    let typesCount = Object.keys(checkboxes).filter(box => checkboxes[box]).length;


    // Slider color change
    const sliderProps = {
        fill: "hsl(127, 100%, 82%)",
	    background: "#18171F",
    }
    const rangeInput = createRef();
    useEffect(() => {
        
        const slider = rangeInput.current;
        colorFillRangeInput(slider);
        // eslint-disable-next-line
    }, []);
    
    function updateSlider(event) {
        setRangeLength(event.target.value);
        const slider = event.target;
        colorFillRangeInput(slider);
    }
    function colorFillRangeInput(slider) {
        const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
        const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
			0.1}%)`;
        setInputStyle({bgStyle: {background: bg}});
    }

    //onChange functions in checkbox input
    const onChangeUppercase = (event) => {
        setCheckboxes(checkboxes => ({...checkboxes, uppercase: event.target.checked}))
    }
    const onChangeLowercase = (event) => {
        setCheckboxes(checkboxes => ({...checkboxes, lowercase: event.target.checked}))
    }
    const onChangeNumber = (event) => {
        setCheckboxes(checkboxes => ({...checkboxes, number: event.target.checked}))
    }
    const onChangeSymbol = (event) => {
        setCheckboxes(checkboxes => ({...checkboxes, symbol: event.target.checked}))
    }
    // random functions for gengerated password
    function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    function getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    function getRandomSymbol() {
        const symbols = '~!@#$%^&*()_+{}":?><;.,';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    const randomFunc = {
        uppercase: getRandomUpper,
        lowercase: getRandomLower,
        number: getRandomNumber,
        symbol: getRandomSymbol,
    };
    const generatePassword = () => {
        props.generatePassword(checkboxes, rangeLength, randomFunc);
    }

    //to work when change happen in rangeLength and checkboxes 
    
    useEffect(()=> {
        changeOptions();
        // eslint-disable-next-line
    }, [rangeLength, checkboxes]);
    const changeOptions = () => {
        props.changeOptions();
    }

    useEffect(()=> {
        updateStrengthType(rangeLength, typesCount);
    }, [rangeLength, typesCount]);
    function updateStrengthType(length, count) {
        if(length < 8) {
            if(count === 1) {
                setStrengthType('too weak')
            } else if (count === 2) {
                setStrengthType('weak');
            } else if (count === 3) {
                setStrengthType('medium');
            } else if(count === 4) {
                setStrengthType('strong');
            }
        } else {
            if(count === 1) {
                setStrengthType('weak')
            } else if (count === 2) {
                setStrengthType('medium');
            } else if (count === 3) {
                setStrengthType('strong');
            } else if(count === 4) {
                setStrengthType('strong');
            }
        }
    }

    return (
        <article className="password-type">
            <div className="type">
                <div className="length">
                    <h3 className="label">Character Length</h3>
                    <p className="number">{rangeLength}</p>
                    <input type="range" id="range" min={5} max={20} onChange={updateSlider} value={rangeLength} style={inputStyle.bgStyle} ref={rangeInput} className="slider-range" />
                </div>
                <div className="checkboxes">
                    <div className="input-control">
                        <input type="checkbox" id="uppercase" name="uppercase" onChange={onChangeUppercase} defaultChecked/>
                        <label htmlFor="uppercase">include uppercase letters</label>
                    </div>
                    <div className="input-control">
                        <input type="checkbox" id="lowercase" name="lowercase" onChange={onChangeLowercase} defaultChecked/>
                        <label htmlFor="lowercase">include lowercase letters</label>
                    </div>
                    <div className="input-control">
                        <input type="checkbox" id="numbers" name="numbers" onChange={onChangeNumber} defaultChecked/>
                        <label htmlFor="numbers">include numbers</label>
                    </div>
                    <div className="input-control">
                        <input type="checkbox" id="symbols" name="symbols" onChange={onChangeSymbol} />
                        <label htmlFor="symbols">include symbols</label>
                    </div>
                </div>
                <Strength length={rangeLength} strengthType={strengthType}/>
                <button type="button" className="btn" onClick={()=> generatePassword(checkboxes)}>generate <img src={Arrow} alt="" /></button>
            </div>
        </article>
    )
}