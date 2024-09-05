import { Container, Stage } from "@pixi/react"
import { EditorStyled } from "../../styles/editorPage"
import { FC, useEffect } from "react"
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react";
import editorSettingsStore from "../../store/editor/editorSettingsStore";
import { RectType } from "../../types/coloringType";
import { Grid } from "../Grid/Grid";


type PropsEditor = {
  grid: number;
  rects?: RectType[];
  isColoring?: boolean;
}

export const Editor: FC<PropsEditor> = observer((props) => {
  const isLandscape = useMediaQuery({query: '(orientation: landscape)'});

  useEffect(() => {
    editorSettingsStore.startSettings(props.grid);

  }, [isLandscape]);

  return (
    <EditorStyled>
      <Stage 
        width={editorSettingsStore.sceneSize.width} 
        height={editorSettingsStore.sceneSize.height}
        options={{backgroundColor: 0xe5e5e5}}
      >
        <Container 
            interactive={true}
            pivot={editorSettingsStore.pivot}
            position={[editorSettingsStore.position.x, editorSettingsStore.position.y]}
            scale={editorSettingsStore.scale}
          >
            <Grid rects={props.rects}/>
          </Container>
      </Stage>
    </EditorStyled>
  )
})
