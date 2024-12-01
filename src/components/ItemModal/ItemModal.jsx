import "./ItemModal.css";
import { defaultClothingItems } from "../../utils/constants";

function ItemModal({ activeModal, handleCloseClick, card }) {
  if (!card) {
    return null;
  }

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.link}
          alt={card.name || "Item Image"}
          className="modal__image"
        />
        <div className="modal_footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
