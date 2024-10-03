import "./Modal.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../../services/reducers/boardReducer";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: number;
  boardId: number;
  itemTitle: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  itemId,
  boardId,
  itemTitle,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState<string>(itemTitle);

  React.useEffect(() => {
    setTitle(itemTitle);
  }, [itemTitle]);

  if (!isOpen) {
    return null;
  }

  const handleUpdate = () => {
    console.log("Updating task:", { itemId, boardId, title });
    dispatch(updateTask({ boardId, itemId, title }));
    onClose();
  };

  const handleDelete = () => {
    console.log("Removing task:", { itemId, boardId });
    dispatch(removeTask({ boardId, itemId }));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
        <h2>Редактировать задачу</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название задачи"
        />
        <div className="change__buttons">
          <button onClick={handleUpdate}>Сохранить</button>
          <button onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
