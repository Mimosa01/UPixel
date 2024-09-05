import { observer } from "mobx-react"
import coloringStore from "../../store/coloring/coloringStore"
import editorSettingsStore from "../../store/editor/editorSettingsStore"
import { RectColoring } from "../Rect/RectColoring"
import { RectFilling } from "../Rect/RectFilling"
import { RectType } from "../../types/coloringType"
import { FC } from "react"


interface PropsGrid {
  rects: RectType[] | undefined;
}

export const Grid: FC<PropsGrid> = observer((props) => {

  return (
    <>
      {editorSettingsStore.coordinatesRects.map((item, index) => (
        !coloringStore.data.isColoring ?
          <RectFilling 
            key={index}
            index={index}
            x={item.x}
            y={item.y}
            cellSize={editorSettingsStore.cellSize}
            fill={props.rects && coloringStore.getColorRect(index)}
          /> :
          <RectColoring 
            key={index}
            index={index}
            x={item.x}
            y={item.y}
            cellSize={editorSettingsStore.cellSize}
            indexColor={coloringStore.getColorIndex(index)}
            fill={coloringStore.getCurrentColor(index)}
          />
      ))}
    </>
  )
})