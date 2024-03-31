import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onClose, imageUrl, imgData }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img
        className={css.largeImg}
        src={imageUrl}
        alt="Large version of the image"
      />
      <div className={css.imgInfo}>
        <p>
          <b>Likes:</b> {imgData.likes}
        </p>
        <p>
          <b>User name:</b> {imgData.user.name}
        </p>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
