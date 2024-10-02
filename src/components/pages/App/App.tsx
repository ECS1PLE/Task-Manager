import React, { useState } from "react";
import "./App.scss";
import Item from "../../Item/Item";
import { useSelector, useDispatch } from "react-redux";
import { addTask, moveTask } from "../../../services/reducers/boardReducer";
import { RootState } from "../../../services/reducers/store";

interface ItemType {
  id: number;
  title: string;
}

interface BoardType {
  id: number;
  title: string;
  items: ItemType[];
}

function App() {
  const dispatch = useDispatch();

  const { boards } = useSelector((state: RootState) => state.boards);

  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<ItemType | null>(null);
  const [currentBoard, setCurrentBoard] = useState<BoardType | null>(null);

  const addTaskHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "" || selectedBoardId === null) {
      return;
    }
    dispatch(addTask({ boardId: selectedBoardId, title: newTaskTitle }));
    setNewTaskTitle("");
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: BoardType,
    item: ItemType
  ) => {
    setDraggedItem(item);
    setCurrentBoard(board);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    targetBoard: BoardType
  ) => {
    e.preventDefault();
    if (currentBoard && draggedItem && currentBoard.id !== targetBoard.id) {
      dispatch(
        moveTask({
          sourceBoardId: currentBoard.id,
          targetBoardId: targetBoard.id,
          itemId: draggedItem.id,
        })
      );
      setDraggedItem(null);
      setCurrentBoard(null);
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <form
        onSubmit={addTaskHandler}
        style={{ marginBottom: "20px" }}
        className="form__add__task"
      >
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Название задачи"
          className="write__task"
        />
        <select
          onChange={(e) => setSelectedBoardId(Number(e.target.value))}
          defaultValue=""
          className="change__type"
        >
          <option value="" disabled>
            Выберите доску
          </option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
        <button type="submit">Добавить задачу</button>
      </form>
      <div className="all__boards">
        {boards.map((board) => (
          <div className="board" key={board.id}>
            <div className="board__title">{board.title}</div>
            {board.items.length === 0 ? (
              <div
                className="item empty"
                onDragOver={dragOverHandler}
                onDrop={(e) => dropHandler(e, board)}
                style={{
                  height: "40px",
                  border: "2px dashed gray",
                  textAlign: "center",
                  lineHeight: "40px",
                  color: "white",
                }}
              >
                Перетащите задачу сюда
              </div>
            ) : (
              board.items.map((item) => (
                <Item
                  key={item.id}
                  title={item.title}
                  onDragOver={dragOverHandler}
                  onDragLeave={dragLeaveHandler}
                  onDragStart={(e) => dragStartHandler(e, board, item)}
                  onDragEnd={() => setDraggedItem(null)}
                  onDrop={(e) => dropHandler(e, board)}
                >
                  {item.title}
                </Item>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
