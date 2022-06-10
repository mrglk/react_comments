import styles from "./Comment.module.scss";

export default function Comment(props) {
  return (
    <div className={styles.Wrapper}>
      <p className={styles.Comment}>
        {props.name}: {props.comment}
      </p>
      <img className={styles.Img} alt={props.name} src={props.src} />
    </div>
  );
}
