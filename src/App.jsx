import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect } from "react";
import { requestPhotos } from "./api/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ReactModal from "react-modal";
import ImageModal from "./components/ImageModal/ImageModal";

ReactModal.setAppElement("#root");

function App() {
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State of chosen photo

  useEffect(() => {
    if (query.length === 0) return;
    async function fetchPhotosByQuery() {
      try {
        setIsLoading(true);
        const data = await requestPhotos(query, page);
        if (results === null) {
          setResults(data.results);
        } else {
          setResults((prevResults) => [...prevResults, ...data.results]);
        }
        setIsLoadMore(true);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotosByQuery();
  }, [query, page]);

  const onSetSearchQuery = (searchPhotos) => {
    setQuery(searchPhotos);
    //Remove previous quiry
    setResults([]);
  };

  const onSetMorePhotos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //Modal React options
  const openModal = (image) => {
    // Pass this function like a props to the ImageGallery component
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSetSearchQuery} />
      {results && <ImageGallery results={results} openModal={openModal} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isLoadMore && results.length !== 0 && (
        <LoadMoreBtn onSetMorePhotos={onSetMorePhotos} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage.urls.regular}
          imgData={selectedImage}
        />
      )}
    </>
  );
}

export default App;