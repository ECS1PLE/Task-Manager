import React from "react";
import { useState } from "react";
import "./App.scss";
import Item from "../../Item/Item";

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
  const [boards, setBoards] = useState<BoardType[]>([
    {
      id: 1,
      title: "В планах",
      items: [
        { id: 1, title: "Поесть" },
        { id: 2, title: "Прогуляться" },
        { id: 3, title: "Сделать таск менеджер" },
      ],
    },
    {
      id: 2,
      title: "В процессе",
      items: [
        { id: 4, title: "Вернуться" },
        { id: 5, title: "Поспать" },
        { id: 6, title: "Проснутсья" },
      ],
    },
    {
      id: 3,
      title: "Сделано",
      items: [
        { id: 7, title: "Уснуть" },
        { id: 8, title: "Почистить зубы" },
        { id: 9, title: "Разложить кровать" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState<BoardType | null>(null);
  const [currentItem, setCurrentItem] = useState<ItemType | null>(null);
  const [count, setCount] = useState<number>(10);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget.className === "item") {
      e.currentTarget.style.boxShadow = "4px 4px 4px white";
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = "none";
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: BoardType,
    item: ItemType
  ) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = "none";
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: BoardType
  ) => {
    e.preventDefault();
    if (!currentBoard || currentBoard.id === board.id) {
      return;
    }

    const currentIndex = currentBoard.items.indexOf(currentItem!);
    if (currentIndex !== -1) {
      currentBoard.items.splice(currentIndex, 1);
    }

    const newItem: ItemType = { ...currentItem!, id: count + 1 };
    setCount(count + 1);

    board.items.push(newItem);
    setBoards([...boards]);
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "" || selectedBoardId === null) {
      return;
    }

    const newTask: ItemType = {
      id: count + 1,
      title: newTaskTitle,
    };
    setCount(count + 1);

    const updatedBoards = boards.map((board) => {
      if (board.id === selectedBoardId) {
        return {
          ...board,
          items: [...board.items, newTask],
        };
      }
      return board;
    });

    setBoards(updatedBoards);
    setNewTaskTitle("");
  };

  return (
    <div className="app">
      <form
        onSubmit={addTask}
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
                  onDragEnd={dragEndHandler}
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
