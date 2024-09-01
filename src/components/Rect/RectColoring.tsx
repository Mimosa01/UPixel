import * as PIXI from 'pixi.js';
import { observer } from "mobx-react";
import { FC, useCallback, useMemo, useState } from "react";
import { getGrayColor } from "../../utils/intensityGrey";
import coloringStore from '../../store/coloringStore';
import { Graphics } from '@pixi/react';
import { TextInRect } from './TextInRect';
import handlerStore from '../../store/editor/handlerStore';

interface PropsRectColoring {
  x: number;
  y: number;
  cellSize: number;
  index: number;
  indexColor?: number;
  fill?: string;
}

export const RectColoring: FC<PropsRectColoring> = observer((props) => {
  // Без этого не работает
  useMemo(() => new PIXI.BlurFilter(0), []);

  const currentRect = coloringStore.data.rects[props.index];

  const initialFill = props.indexColor !== undefined ? getGrayColor(props.indexColor + 1) : '#fff';

  const [fill, setFill] = useState<string>(props.fill ? props.fill : initialFill);
  
  const [alpha, setAlpha] = useState<number>(
    currentRect && (currentRect.currentColorIndex === currentRect.indexColor) || fill === initialFill ? 1 : 0.5
  );

  const handleColoring = useCallback(() => {
    const color = coloringStore.handleFilling(props.index);
    setFill(color ? color : initialFill);

    setAlpha(
      ((coloringStore.getColorIndex(props.index) === coloringStore.getCurrentColorIndex(props.index)) &&
      (coloringStore.getColorIndex(props.index) !== undefined)) || 
      (!color) ? 
      1 : 0.5
    );
  }, [props.index, initialFill]);

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(fill);
    g.lineStyle(1, '#e5e5e5', 0.5);
    g.drawRect(props.x, props.y, props.cellSize, props.cellSize);
    g.endFill();
  }, [props, fill]);
  
  return (
    <>
      <Graphics 
        draw={draw}
        interactive={true}
        alpha={alpha}
        ontap={(event) => {
          if (!handlerStore.isMove) {
            event.stopPropagation();
            handleColoring()
          }
        }}
        onclick={(event) => {
          if (!handlerStore.isMove) {
            event.stopPropagation();
            handleColoring()
          }
        }}
      />
      {props.indexColor !== undefined && fill !== coloringStore.getColorRect(props.index) &&
        <TextInRect 
          x={props.x + props.cellSize / 2}
          y={props.y + props.cellSize / 2}
          text={(props.indexColor + 1).toString()}
        />
      }
    </>
  )
});
