// import "./ModalWithForm.css";
// function ModalWithForm({
//   children,
//   buttonText,
//   title,
//   activeModal,
//   handleCloseClick,
// }) {
//   return (
//     <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
//       <div className="modal__content">
//         <h2 className="modal__title">{title}</h2>
//         <button
//           onClick={handleCloseClick}
//           type="button"
//           className="modal__close"
//         ></button>
//         <form className="modal__form">
//           {children}
//           <button
//             type="submit"
//             className="modal__submit modal__submit_type_submit"
//           >
//             {buttonText}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ModalWithForm;
///////////////////////////////////////

import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  isOpen,
  handleCloseClick,
  onSubmit,
}) {
  return (
    // <div
    //   className={`modal ${activeModal === "add-garment" && "modal_opened"}`}
    //   isOpen={activeModal === "add-garment"}
    // >
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
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
