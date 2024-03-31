const ImageCard = ({ photo, openModal }) => {
  return (
    <div onClick={() => openModal(photo)}>
      <img src={photo.urls.small} alt={photo.alt_description} />
    </div>
  );
};

export default ImageCard;
