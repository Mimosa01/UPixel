import { Container, Stage } from "@pixi/react"
import { EditorStyled } from "../../styles/editorPage"
import { FC, useEffect } from "react"
import { useMediaQuery } from "react-responsive";
import { Rect } from "../Rect/Rect";
import { observer } from "mobx-react";
import editorSettingsStore from "../../store/editor/editorSettingsStore";
import coloringStore from "../../store/coloringStore";
import { RectType } from "../../types/coloringType";


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
            {editorSettingsStore.coordinatesRects.map((item, index) => (
              <Rect 
                key={index}
                index={index}
                x={item.x}
                y={item.y}
                cellSize={editorSettingsStore.cellSize}
                isFilling={props.rects && coloringStore.getFilling(index)}
                fill={props.rects && coloringStore.getColorRect(index)}
                indexColor={(props.rects && props.isColoring) ? coloringStore.getColorIndex(index) : undefined}
              />
            ))}
          </Container>
      </Stage>
    </EditorStyled>
  )
})
