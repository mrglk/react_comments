import { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import Comment from "../Comment/Comment";

export default function Form() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const addComment = (nameInput, textInput) => {
    if (nameInput && textInput) {
      const newComment = {
        id: new Date().getTime(),
        avtor: nameInput,
        text: checkSpam(textInput),
      };
      setComments([...comments, newComment]);
    }
  };

  const checkSpam = (str) => {
    return str.replace(/viagra|xxx/gi, "***");
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(name, comment);
  };

  useEffect(() => {
    console.log(comments);
    setComment("");
  }, [comments]);

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <h1>Комментарии</h1>
      <div className={styles.Area}>
        {comments.map((item) => (
          <Comment key={item.id} name={item.avtor} comment={item.text} />
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
            onChange={handleChangeName}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Аватар</label>
        </div>
        <div>
          <input type="file" name="file" id="file" />
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
          minLength="3"
          onChange={handleChangeComment}
        />
        <div>
          <button type="submit">Отправить</button>
        </div>
      </div>
    </form>
  );
}
