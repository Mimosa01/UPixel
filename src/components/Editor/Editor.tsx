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
import { MAX_CELLSIZE } from "../../consts";
import { observer } from "mobx-react";
import editorEventsStore from "../../store/editorEventsStore";

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

document.addEventListener('touchstart', (event) => editorEventsStore.onTouchStart(event))
document.addEventListener('touchmove', (event) => editorEventsStore.onTouchMove(event))
document.addEventListener('touchend', (event) => editorEventsStore.onTouchEnd(event))
document.addEventListener('wheel', (event) => editorEventsStore.wheelScale(event))

type PropsEditor = {
  grid: number;
  rects?: ColorForColoringType[];
  isColoring?: boolean;
}

export const Editor: FC<PropsEditor> = observer((props) => {
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
    const widthOrHeight = editorRef.current.clientWidth < editorRef.current.clientHeight ? 
      editorRef.current.clientWidth : 
      editorRef.current.clientHeight;

    setCellSize((widthOrHeight / props.grid < MAX_CELLSIZE) ? widthOrHeight / props.grid : MAX_CELLSIZE);
  }, [props.grid, cellSize]);

  useEffect(() => {
    editorEventsStore.setPosition({x: editorRef.current.clientWidth / 2, y: editorRef.current.clientHeight / 2})
    editorEventsStore.maxScale = MAX_CELLSIZE / cellSize;
    editorEventsStore.sceneSize = {
      width: sceneSize.width,
      height: sceneSize.height
    };
    editorEventsStore.containerSize = {
      width: cellSize * props.grid,
      height: cellSize * props.grid
    }
  }, [cellSize, sceneSize, props.grid]);

  return (
    <EditorStyled 
      ref={editorRef}
    >
      <Stage 
        width={sceneSize.width} 
        height={sceneSize.height}
        options={{backgroundColor: 0xe5e5e5}}
      >
        <Container 
            interactive={true}
            pivot={cellSize * props.grid / 2}
            // [editorEventsStore.position.x, editorEventsStore.position.y]
            // [sceneSize.width / 2, sceneSize.height / 2]
            position={[editorEventsStore.position.x, editorEventsStore.position.y]}
            scale={editorEventsStore.scale}
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
      </Stage>
    </EditorStyled>
  )
})
