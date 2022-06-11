import { useEffect, useRef, useState } from "react";
import styles from "./Form.module.scss";
import Comment from "../Comment/Comment";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Form() {
  const [commentsToLocal, setCommentsToLocal] = useLocalStorage("comment", []);
  const [nameToLocal, setNameToLocal] = useLocalStorage("name", []);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(
    "https://cdn0.iconfinder.com/data/icons/clearicons/789/anonim-512.png"
  );
  const [error, setError] = useState("");
  const fileInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationComment(comment)) {
      addComment(name, comment, photo);
      setNameToLocal(name);
      setComment("");
      setError("");
    } else {
      setError("Комментарий должен содержать минимум 3 символа");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const addComment = (nameInput, textInput, fileInput) => {
    if (nameInput && textInput) {
      const newComment = {
        id: new Date().getTime(),
        autor: nameInput,
        text: checkSpam(textInput),
        avatar: fileInput,
      };
      setCommentsToLocal((commentsToLocal) => [newComment, ...commentsToLocal]);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value.trimStart().replace(/ +/g, " ");
    e.target.name === "comment" ? setComment(value) : setName(value);
  };

  const handleChangeFile = (e) => {
    let file = fileInput.current.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      setPhoto(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const validationComment = (value) => {
    return value.length < 3 ? false : true;
  };

  const checkSpam = (str) => {
    return str.replace(/viagra|xxx/gi, "***");
  };

  useEffect(() => {
    if (nameToLocal !== "") {
      setName(nameToLocal);
    }
  }, [nameToLocal]);

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <h1>Комментарии</h1>
      <div className={styles.Area}>
        {commentsToLocal.map((item) => (
          <Comment
            key={item.id}
            name={item.autor}
            comment={item.text}
            src={item.avatar}
            alt={item.autor}
          />
        ))}
      </div>
      <div className={styles.Comment}>
        <div>
          <label htmlFor="name">Имя *</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="photo">Аватар</label>
        </div>
        <div>
          <input
            type="file"
            name="file"
            id="file"
            ref={fileInput}
            onChange={handleChangeFile}
          />
        </div>
        <label htmlFor="comment" className={styles.Description}>
          Комментарий:
        </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          rows="10"
          cols="50"
          minLength={3}
          required={true}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <div>
          <button type="submit">Отправить</button>
        </div>
        <div className={styles.Error}>{error}</div>
      </div>
    </form>
  );
}
