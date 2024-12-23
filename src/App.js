import styles from "./app.module.css";
import React, { useState } from "react";

export const App = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [isValueVaild, setIsValueValid] = useState(false);

  const onInputButtonClick = () => {
    const promptValue = prompt("Введите значение");
    if (promptValue.length >= 3) {
      setIsValueValid(true);
      setValue(promptValue);
      setError("");
    } else {
      setIsValueValid(false);
      setError("Введенное значение должно содержать минимум 3 символа");
    }
  };

  const onAddButtonClick = () => {
    if (isValueVaild) {
      const id = Date.now();
      setList([...list, { id, value }]);
      setValue("");
      setError("");
      setIsValueValid(false);
    } else {
      setError("Для добавления в список значение должно быть валидным");
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение <code>value</code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error !== "" ? <div className={styles.error}>{error}</div> : null}
      <div className={styles["buttons-container"]}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          onClick={onAddButtonClick}
          disabled={!isValueVaild}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {list.length === 0 ? (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        ) : (
          <ul className={styles.list}>
            {list.map(({ id, value }) => (
              <li key={id} className={styles["list-item"]}>
                {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
