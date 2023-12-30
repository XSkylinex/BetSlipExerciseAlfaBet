import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOption } from "../../components/ChooseBoxes";

import backendData from "../../data/backendData.json";

export const fetchData = createAsyncThunk("backend/data", async () => {
  const response: any = backendData;
  return response;
});

const updateSingleBet = (
  state: IHome,
  action: PayloadAction<ISingleBet>,
  updater: (currentValue: number) => number
) => {
  const targetBox = state.selectedBoxes.find(
    (box) =>
      box.sectionId === action.payload.sectionId &&
      box.name === action.payload.name &&
      box.value === action.payload.value
  );

  const getSafeSingleBet = (box: ISingleBet) => box.singleBet || 0;

  if (targetBox) {
    const currentBet = getSafeSingleBet(targetBox);
    targetBox["singleBet"] = updater(currentBet);
  }

  const calculateBets = () =>
    state.selectedBoxes.reduce(
      (count, box) => count + (getSafeSingleBet(box) > 0 ? 1 : 0),
      0
    );

  const calculateTotalBets = () =>
    state.selectedBoxes.reduce(
      (total, box) => total + getSafeSingleBet(box),
      0
    );

  state.singleBetData.bets = calculateBets();
  state.singleBetData.totalBets = calculateTotalBets();
};

interface ISingleBetData {
  bets: number;
  totalBets: number;
}

interface ISingleBet {
  value: number;
  name: string;
  sectionId: number;
  singleBet?: number;
}

interface IHome {
  selectedBoxes: IOption[];
  isLoaded?: boolean;
  dummyData: any;
  sumTotalValue: number;
  boxLength: number;
  sideMenu?: boolean;
  betSlipHight: number;
  singleBetData: ISingleBetData;
}

const initialState: IHome = {
  selectedBoxes: [],
  dummyData: [],
  sumTotalValue: 0,
  boxLength: 0,
  sideMenu: false,
  betSlipHight: 0,
  singleBetData: { bets: 0, totalBets: 0 },
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedBoxes: (state, action: PayloadAction<IOption[]>) => {
      const newSelectedBoxes = action.payload;

      // Filter out existing single-selection boxes that have a replacement in new boxes
      let filteredExistingBoxes = state.selectedBoxes.filter((existingBox) => {
        if (existingBox.selectionMode === "single") {
          return !newSelectedBoxes.some(
            (newBox) =>
              newBox.sectionId === existingBox.sectionId &&
              newBox.selectionMode === "single"
          );
        }
        return true;
      });

      // Add or replace boxes based on their selection mode
      newSelectedBoxes.forEach((newBox) => {
        if (newBox.selectionMode === "single") {
          // Replace or add the new single-selection box
          const index = filteredExistingBoxes.findIndex(
            (existingBox) => existingBox.sectionId === newBox.sectionId
          );
          if (index !== -1) {
            filteredExistingBoxes[index] = newBox;
          } else {
            filteredExistingBoxes.push(newBox);
          }
        } else {
          // For multi-selection, add if not already present
          if (
            !filteredExistingBoxes.some(
              (existingBox) =>
                newBox.value === existingBox.value &&
                newBox.sectionId === existingBox.sectionId &&
                newBox.name === existingBox.name
            )
          ) {
            filteredExistingBoxes.push(newBox);
          }
        }
      });

      state.sumTotalValue = filteredExistingBoxes.reduce(
        (num, total) => num + total.value,
        0
      );
      state.boxLength = filteredExistingBoxes.length;
      state.selectedBoxes = filteredExistingBoxes.sort(
        (a, b) => a.sectionId - b.sectionId
      );
    },

    removeSelectedBox(
      state,
      action: PayloadAction<{ value: number; name: string; sectionId: number }>
    ) {
      const indexToRemove = state.selectedBoxes.findIndex(
        (box) =>
          box.value === action.payload.value &&
          box.sectionId === action.payload.sectionId &&
          box.name === action.payload.name
      );

      if (indexToRemove !== -1) {
        state.singleBetData.totalBets -=
          state.selectedBoxes[indexToRemove]?.singleBet ?? 0;
        if (
          state.singleBetData.bets &&
          state.selectedBoxes[indexToRemove]?.singleBet
        )
          state.singleBetData.bets -= 1;

        state.selectedBoxes
          .splice(indexToRemove, 1)
          .sort((a, b) => a.sectionId - b.sectionId);
      }

      state.boxLength = state.selectedBoxes.length;
      if (state.boxLength === 0) state.sideMenu = false;
      state.sumTotalValue = state.selectedBoxes.reduce(
        (num, total) => num + total.value,
        0
      );
    },
    toggleSideMenu(state) {
      state.sideMenu = !state.sideMenu;
    },

    removeAll(state) {
      state.selectedBoxes = [];
      state.boxLength = 0;
      state.sumTotalValue = 0;
      state.sideMenu = false;
    },

    setBetSlipHight(state, action: PayloadAction<number>) {
      state.betSlipHight = action.payload;
    },
    increaseBet(state) {
      state.sumTotalValue += 1;
    },
    decreaseBet(state) {
      state.sumTotalValue -= 1;
    },
    increaseBetManual(state, action: PayloadAction<number>) {
      state.sumTotalValue = isNaN(action.payload) ? 0 : action.payload;
    },
    increaseSingleBet(state, action: PayloadAction<ISingleBet>) {
      updateSingleBet(state, action, (currentValue) => currentValue + 1);
    },
    decreaseSingleBet(state, action: PayloadAction<ISingleBet>) {
      updateSingleBet(state, action, (currentValue) => currentValue - 1);
    },
    increaseSingleBetManual(state, action: PayloadAction<ISingleBet>) {
      updateSingleBet(state, action, () => Number(action.payload.singleBet));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.dummyData = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchData.pending, (state) => {
        state.isLoaded = false;
      });
  },
});

export const {
  setSelectedBoxes,
  removeSelectedBox,
  toggleSideMenu,
  removeAll,
  setBetSlipHight,
  increaseBet,
  decreaseBet,
  increaseBetManual,
  increaseSingleBet,
  decreaseSingleBet,
  increaseSingleBetManual,
} = homeSlice.actions;

export default homeSlice.reducer;
