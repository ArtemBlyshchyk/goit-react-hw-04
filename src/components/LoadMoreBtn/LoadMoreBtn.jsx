import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ onSetMorePhotos }) => {
  return (
    <div className={css.buttonContainer}>
      <button onClick={onSetMorePhotos}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;
