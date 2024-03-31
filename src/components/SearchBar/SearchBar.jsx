import toast, { Toaster } from "react-hot-toast";
const notify = () => toast.error("Enter text for search photos!");
import { IoIosSearch } from "react-icons/io";

import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const { searchPhotos } = form.elements;
    if (searchPhotos.value.trim() === "") {
      notify();
    } else {
      onSubmit(searchPhotos.value);
      form.reset();
    }
  };
  return (
    <header className={css.headercontainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchPhotos"
        />
        <button type="submit">
          <IoIosSearch />
        </button>
        <Toaster position="top-right" />
      </form>
    </header>
  );
};

export default SearchBar;
