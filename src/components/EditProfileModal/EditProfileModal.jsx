import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { updateUserProfile } from "../../utils/api";

function EditProfileModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Define loading state

  // Populate fields with current user data when modal opens
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        onUpdateUser(updatedUser); // Update state in parent component
        onClose(); // Close modal
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText={isLoading ? "Saving..." : "Save"} // ✅ Show loading state
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Avatar URL:
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

// import React, { useState, useEffect } from "react";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import { updateUserProfile } from "../../utils/api";

// function EditProfileModal({ isOpen, onClose, currentUser, onUpdateUser }) {
//   const [name, setName] = useState("");
//   const [avatar, setAvatar] = useState("");

//   // Populate fields with current user data when modal opens
//   useEffect(() => {
//     if (currentUser) {
//       setName(currentUser.name || "");
//       setAvatar(currentUser.avatar || "");
//     }
//   }, [currentUser, isOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     updateUserProfile({ name, avatar })
//       .then((updatedUser) => {
//         onUpdateUser(updatedUser); // Update state in parent component
//         onClose(); // Close modal
//       })
//       .catch((err) => {
//         console.error("Failed to update profile:", err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <ModalWithForm
//       title="Edit Profile"
//       buttonText="Save"
//       isOpen={isOpen}
//       handleCloseClick={onClose}
//       onSubmit={handleSubmit}
//     >
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Avatar URL:
//         <input
//           type="url"
//           value={avatar}
//           onChange={(e) => setAvatar(e.target.value)}
//           required
//         />
//       </label>
//     </ModalWithForm>
//   );
// }

// export default EditProfileModal;
