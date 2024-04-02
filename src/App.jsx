import { useRef, useState } from "react";
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
  const [showBtn, setShowBtn] = useState(false);
  //Auto scroll
  const listRef = useRef(null);
  const scrollHeight = useRef(0);
  useEffect(() => {
    if (!listRef.current) return;
    window.scroll({ behavior: "smooth", top: scrollHeight.current });
    scrollHeight.current = listRef.current.clientHeight;
  }, [results]);

  useEffect(() => {
    if (query.length === 0) return;
    async function fetchPhotosByQuery() {
      try {
        setIsLoading(true);
        const data = await requestPhotos(query, page);
        setShowBtn(data.total_pages > page);
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
    if (searchPhotos === query) {
      return;
    } else {
      setQuery(searchPhotos);
    }
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
      {results && (
        <ImageGallery results={results} openModal={openModal} ref={listRef} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isLoadMore && results.length !== 0 && showBtn && (
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
