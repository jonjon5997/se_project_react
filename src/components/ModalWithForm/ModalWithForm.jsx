import "./ModalWithForm.css";
function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  isOpen,
  handleCloseClick,
  onSubmit,
  // handleSubmit,
  // handleLogin,
  // handleRegistration,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit modal__submit_type_submit"
            // onClick={handleLogin}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
