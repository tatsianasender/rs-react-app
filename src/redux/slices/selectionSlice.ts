import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../types/types';

interface SelectionState {
  selectedItems: Person[];
}

const initialState: SelectionState = {
  selectedItems: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleItemSelection: (state, action: PayloadAction<Person>) => {
      const itemIndex = state.selectedItems.findIndex(
        (i) => i.url === action.payload.url
      );
      if (itemIndex > -1) {
        state.selectedItems.splice(itemIndex, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleItemSelection, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
