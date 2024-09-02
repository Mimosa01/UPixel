import { FC, ReactNode } from "react"
import { Button } from "../../styles/button"
import { EditorPageStyled } from "../../styles/editorPage"
import { ArrowIcon } from "../Icons/ArrowIcon"
import coloringStore from "../../store/coloring/coloringStore";

interface PropsEditorPage {
  editor: ReactNode;
  pallete: ReactNode;
}

const handleSave = () => {
  coloringStore.saveCanvas();
}

export const EditorPage: FC<PropsEditorPage> = ({ editor, pallete }) => {

  return (
    <EditorPageStyled>
      <Button 
        $absolute 
        $icon
        onClick={() => handleSave()}
      >
        <ArrowIcon />
      </Button>

      {editor}
      {pallete}
      
    </EditorPageStyled>
  )
}
