import { ChangeEvent, useState } from "react";

export type EditableSpan = {
  title: string;
  callBack: (title: string) => void
};

export function EditableSpan(props: EditableSpan) {
  let { title, callBack} = props;

  let [editMode, setEditMode] = useState(false);

  let [inputValue, setInputValue] = useState("")

  const setEditModeHandler = () => {
    setEditMode(true);
    setInputValue(title);
    
  };

  const setViewModeHandler = () => {
    setEditMode(false);
    callBack(inputValue);
  };

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return editMode ? (
    <input type="text" value={inputValue} onBlur={setViewModeHandler} onChange={changeInputValue} autoFocus/>
  ) : (
    <span onDoubleClick={setEditModeHandler}>{title}</span>
  );
}
