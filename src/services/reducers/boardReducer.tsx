// src/store/boardsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemType {
  id: number;
  title: string; // Это поле будет хранить текст заметки
  content?: string; // Это новое поле для текста заметки
}

interface BoardType {
  id: number;
  title: string;
  items: ItemType[];
}

interface BoardsState {
  boards: BoardType[];
  count: number;
}

const initialState: BoardsState = {
  boards: [
    {
      id: 1,
      title: "В планах",
      items: [
        { id: 1, title: "Поесть", content: "Планирую поехать в кафе" },
        { id: 2, title: "Прогуляться", content: "Прогулка по парку" },
        {
          id: 3,
          title: "Сделать таск менеджер",
          content: "Создать приложение",
        },
      ],
    },
    {
      id: 2,
      title: "В процессе",
      items: [
        { id: 4, title: "Вернуться", content: "Вернуться домой" },
        { id: 5, title: "Поспать", content: "Час до сна" },
        { id: 6, title: "Проснутсья", content: "Встать рано" },
      ],
    },
    {
      id: 3,
      title: "Сделано",
      items: [
        { id: 7, title: "Уснуть", content: "Лечь спать" },
        {
          id: 8,
          title: "Почистить зубы",
          content: "Пользоваться зубной нитью",
        },
        { id: 9, title: "Разложить кровать", content: "Прибрать постель" },
      ],
    },
  ],
  count: 10,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        boardId: number;
        title: string;
        content?: string;
      }>
    ) => {
      const { boardId, title, content } = action.payload;
      const newTask = { id: state.count + 1, title, content };
      state.count += 1;

      const board = state.boards.find((board) => board.id === boardId);
      if (board) {
        board.items.push(newTask);
      }
    },
    moveTask: (
      state,
      action: PayloadAction<{
        sourceBoardId: number;
        targetBoardId: number;
        itemId: number;
      }>
    ) => {
      const { sourceBoardId, targetBoardId, itemId } = action.payload;

      const sourceBoard = state.boards.find(
        (board) => board.id === sourceBoardId
      );
      const targetBoard = state.boards.find(
        (board) => board.id === targetBoardId
      );

      if (sourceBoard && targetBoard) {
        const itemIndex = sourceBoard.items.findIndex(
          (item) => item.id === itemId
        );
        if (itemIndex !== -1) {
          const [item] = sourceBoard.items.splice(itemIndex, 1);
          targetBoard.items.push(item);
        }
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{
        boardId: number;
        itemId: number;
        title: string;
        content?: string;
      }>
    ) => {
      const { boardId, itemId, title, content } = action.payload;
      const board = state.boards.find((board) => board.id === boardId);
      if (board) {
        const item = board.items.find((item) => item.id === itemId);
        if (item) {
          item.title = title;
          item.content = content;
        }
      }
    },
    removeTask: (
      state,
      action: PayloadAction<{
        boardId: number;
        itemId: number;
      }>
    ) => {
      const { boardId, itemId } = action.payload;
      const board = state.boards.find((board) => board.id === boardId);
      if (board) {
        console.log("Before removal:", board.items);
        board.items = board.items.filter((item) => item.id !== itemId);
        console.log("After removal:", board.items);
      }
    },
  },
});

export const { addTask, moveTask, updateTask, removeTask } =
  boardsSlice.actions;
export default boardsSlice.reducer;
