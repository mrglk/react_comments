import styles from "./Comment.module.scss";

export default function Comment(props) {
  return (
    <div className={styles.Wrapper}>
      <p className={styles.Comment}>
        {props.name}: {props.comment}
      </p>
      <img
        className={styles.Img}
        alt="Avatar"
        src="https://cdn0.iconfinder.com/data/icons/clearicons/789/anonim-512.png"
      />
    </div>
  );
}
