// src/store/boardsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemType {
  id: number;
  title: string;
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
  ],
  count: 10,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ boardId: number; title: string }>
    ) => {
      const { boardId, title } = action.payload;
      const newTask = { id: state.count + 1, title };
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
  },
});

export const { addTask, moveTask } = boardsSlice.actions;
export default boardsSlice.reducer;
