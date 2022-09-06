import ColorBoxes from "./ColorBoxes";

export default function Strength(props) {
    return (
        <div className="password-strength">
            <h4 className="strength-title">Strength</h4>
            <div className="strength">
                <h4>{props.strengthType}</h4>
                <ColorBoxes type={props.strengthType} />
            </div>
        </div>
    );
}