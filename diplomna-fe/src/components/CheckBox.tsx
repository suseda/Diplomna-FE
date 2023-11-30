interface CheckBoxProps {
  text: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}

function CheckBox(props: CheckBoxProps) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">{props.text}</span>
        <input
          type="checkbox"
          className="checkbox checkbox-success"
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
        />
      </label>
    </div>
  );
}

export default CheckBox;