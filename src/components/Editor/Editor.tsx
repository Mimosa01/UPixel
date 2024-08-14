import { Container, Stage } from "@pixi/react"
import { EditorStyled } from "../../styles/editorPage"
import { FC, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive";
import { Rect } from "../Rect/Rect";
import colorStore from "../../store/colorStore";
import { ColorForColoringType } from "../../types/coloringType";
import { HandleColoringType, HandleFillingType } from "../../types/handlersTypes";
import coloringStore from "../../store/coloringStore";
import { getFilling, getColorRect, getColorIndex } from "../../utils/getRectProps";
import { gridCoordinates } from "../../utils/grid";
import Viewport from "./Viewport";

type Sizes = {
  width: number;
  height: number;
}

const handleClickFilling = ({
  setFill, 
  initialFill,
  indexRect
}: HandleFillingType) => {
  if (colorStore.isClear) {
    
    setFill(initialFill);
    coloringStore.clearRect(indexRect);

  } else if (colorStore.selectedColor !== '') {
    
    setFill(colorStore.selectedColor);
    coloringStore.addRect({index: indexRect, color: colorStore.selectedColor});
  
  }
}

const handleColoring = ({
  setFill,
  setAlpha,
  initialFill,
  someFill,
  indexRect
}: HandleColoringType) => {
  if (colorStore.isClear) {
    
    setFill(initialFill);
    setAlpha(1);
    coloringStore.clearRect(indexRect);

  } else if (colorStore.selectedColor !== '') {
    
    if (colorStore.selectedColor !== someFill) {
      setAlpha(0.5);
    } else {
      setAlpha(1);
    }
    
    setFill(colorStore.selectedColor);
    coloringStore.addRect({index: indexRect, color: colorStore.selectedColor, isColoring: true});
  }
}

type PropsEditor = {
  grid: number;
  rects?: ColorForColoringType[];
  isColoring?: boolean;
}

export const Editor: FC<PropsEditor> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null!);

  const [sceneSize, setSceneSize] = useState<Sizes>({width: 0, height: 0});
  const [cellSize, setCellSize] = useState<number>(0);

  const isLandscape = useMediaQuery({query: '(orientation: landscape)'});

  useEffect(() => {
    setSceneSize({
      width: editorRef.current.clientWidth,
      height: editorRef.current.clientHeight
    });
  }, [isLandscape]);

  useEffect(() => {
    // Надо будет константу сделать 
    setCellSize((editorRef.current.clientWidth / props.grid < 50) ? editorRef.current.clientWidth / props.grid : 50)
  }, [props.grid]);

  return (
    <EditorStyled ref={editorRef}>
      <Stage 
        width={sceneSize.width} 
        height={sceneSize.height}
        options={{backgroundColor: 0xe5e5e5}}
      >
        <Viewport>
          <Container 
            interactive={true}
            pivot={cellSize * props.grid / 2}
            position={[sceneSize.width / 2, sceneSize.height / 2]}
          >
            {gridCoordinates(props.grid, cellSize).map((item, index) => (
              <Rect 
                key={index}
                index={index}
                x={item.x}
                y={item.y}
                cellSize={cellSize}
                isFilling={props.rects && getFilling(index, [...props.rects])}
                fill={props.rects && getColorRect(index, [...props.rects])}
                indexColor={(props.rects && props.isColoring) ? getColorIndex(index, [...props.rects]) : undefined}
                handleFilling={!props.isColoring ? handleClickFilling : undefined}
                handleColoring={props.isColoring ? handleColoring : undefined}
              />
            ))}
          </Container>
        </Viewport>
      </Stage>
    </EditorStyled>
  )
}
