import { Container, Stage } from "@pixi/react"
import { EditorStyled } from "../../styles/editorPage"
import { FC, useEffect } from "react"
import { useMediaQuery } from "react-responsive";
import { Rect } from "../Rect/Rect";
import colorStore from "../../store/colorStore";
import { ColorForColoringType } from "../../types/coloringType";
import { HandleColoringType, HandleFillingType } from "../../types/handlersTypes";
import coloringStore from "../../store/coloringStore";
import { getFilling, getColorRect, getColorIndex } from "../../utils/getRectProps";
import { observer } from "mobx-react";
import editorSettingsStore from "../../store/editor/editorSettingsStore";
import scaleStore from "../../store/editor/scaleStore";
import movingStore from "../../store/editor/movingStore";

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

document.addEventListener('wheel', (event) => scaleStore.wheelScale(event));

document.addEventListener('touchstart', (event) => scaleStore.onScaleTouchStart(event));
document.addEventListener('touchmove', (event) => scaleStore.onScaleTouchMove(event));
document.addEventListener('touchend', () => scaleStore.onScaleTouchEnd());

document.addEventListener('touchstart', (event) => movingStore.onMoveTouchStart(event));
document.addEventListener('touchmove', (event) => movingStore.onMoveTouch(event));
document.addEventListener('touchend', () => movingStore.onMoveTouchEnd());

document.addEventListener('pointerdown', (event) => movingStore.onMovePointerStart(event));
document.addEventListener('pointermove', (event) => movingStore.onMovePointer(event));
document.addEventListener('pointerup', () => movingStore.onMovePointerEnd());

type PropsEditor = {
  grid: number;
  rects?: ColorForColoringType[];
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
