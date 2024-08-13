import { FC, ReactNode } from "react";
import { getColorings } from "../../api/colorings";
import { testCanvas, testColoring } from "../../testScene";
import { EditorPage } from "./EditorPage";
import { Editor } from "../Editor/Editor";
import coloringStore from "../../store/coloringStore";
import { Pallete } from "../Pallete/Pallete";
import { StateFetch } from "../../types/stateEditorPage";

const mockPallete: string[] = ['#FF0000', '#00FF00', '#0000FF'];

interface PropsFetch {
  state: StateFetch;
}

export const FetchEditorPage: FC<PropsFetch> = ({ state }) => {

  let editor: ReactNode;
  let pallete: ReactNode = <Pallete colors={mockPallete}/>;

  switch (state) {
    case StateFetch.NEW_EDIT:
      coloringStore.createCanvas();

      editor = <Editor grid={10}/>
      break;

    case StateFetch.EDIT:
      getColorings(testCanvas);

      editor = <Editor 
        grid={coloringStore.data.grid}
        rects={coloringStore.data.rects}
      />
      break;

    case StateFetch.COLORING:
      getColorings(testColoring);

      editor = <Editor 
        grid={coloringStore.data.grid}
        rects={coloringStore.data.rects}
        isColoring={coloringStore.data.isColoring}
      />;

      pallete = <Pallete 
        colors={(coloringStore.data.pallete && coloringStore.data.pallete.length > 0) ? 
        coloringStore.data.pallete : 
        mockPallete}
      />;
      break; 
  }
  
  return (
    <EditorPage 
      editor={editor}
      pallete={pallete}
    />
  )
}