// import { useState } from "react";
import styles from "./Form.module.scss";

export default function Form() {
  return (
    <div className={styles.Form}>
      <h1>Комментарии</h1>
      <div className={styles.Area}></div>
      <div className={styles.Comment}>
        <div>
          <label for="name">Имя *</label>
        </div>
        <div>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label for="photo">Аватар</label>
        </div>
        <div>
          <input type="file" name="file" id="file" />
        </div>
        <label for="comment" className={styles.Description}>
          Комментарий:
        </label>
        <textarea id="comment" rows="10" cols="50" minlength="3"></textarea>
        <div>
          <button type="submit">Отправить</button>
        </div>
      </div>
    </div>
  );
}
