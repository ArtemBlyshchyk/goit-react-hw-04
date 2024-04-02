import { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
const ImageGallery = forwardRef(function ImageGallery(
  { results, openModal },
  ref
) {
  return (
    <ul className={css.listContainer} ref={ref}>
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
});

export default ImageGallery;
