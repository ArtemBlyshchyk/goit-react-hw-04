import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
const ImageGallery = ({ results, openModal }) => {
  return (
    <ul className={css.listContainer}>
      {Array.isArray(results) &&
        results.map((photo) => {
          return (
            <li key={photo.id}>
              <ImageCard photo={photo} openModal={openModal} />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
