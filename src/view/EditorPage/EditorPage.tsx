import { FC, ReactNode } from "react"
import { Button } from "../../styles/button"
import { EditorPageStyled } from "../../styles/editorPage"
import { ArrowIcon } from "../../components/Icons/ArrowIcon"
import saveColoringStore from "../../store/coloring/saveColoringStore";

interface PropsEditorPage {
  editor: ReactNode;
  pallete: ReactNode;
}

const handleSave = () => {
  saveColoringStore.saveCanvas();
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
