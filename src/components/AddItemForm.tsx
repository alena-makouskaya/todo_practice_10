import { ChangeEvent, useState } from "react";

export type AddItemFormPropsType = {
  callBack: (value: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let { callBack } = props;

  let [inputValue, setInputValue] = useState("");
  let [error, setError] = useState<string | null>(null);

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    if (error) {
      setError(null);
    }
  };

  const callBackHandler = () => {
    if (inputValue.trim() !== "") {
      callBack(inputValue.trim());
      setInputValue("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={changeInputValue}
        className={error ? "error" : ""}
      />
      <button onClick={callBackHandler}> + </button>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
}
