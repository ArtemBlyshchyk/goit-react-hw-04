import css from "./ErrorMessage.module.css";
const ErrorMessage = ({
  message = "Something seems to have gone wrong, please reload the page!",
}) => {
  return <p className={css.errorNotification}>{message}</p>;
};

export default ErrorMessage;
