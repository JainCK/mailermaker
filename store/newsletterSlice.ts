import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsletterContent } from "@/types/newsletter";

const initialState: NewsletterContent = {
  title: "",
  content: "",
  editorMode: "richtext",
  primaryColor: "#3b82f6",
  fontFamily: "Arial, sans-serif",
};

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setEditorMode: (state, action: PayloadAction<"markdown" | "richtext">) => {
      state.editorMode = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    resetNewsletter: () => initialState,
  },
});

export const {
  setTitle,
  setContent,
  setEditorMode,
  setPrimaryColor,
  setFontFamily,
  resetNewsletter,
} = newsletterSlice.actions;

export default newsletterSlice.reducer;
