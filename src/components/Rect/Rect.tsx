import * as PIXI from 'pixi.js';
import { Graphics, Text } from "@pixi/react";
import { FC, memo, useCallback, useState } from "react"
import { observer } from 'mobx-react';
import { getGrayColor } from '../../utils/intensityGrey';
import coloringStore from '../../store/coloringStore';


interface PropsRect {
  x: number;
  y: number;
  cellSize: number;
  index: number;
  indexColor?: number;
  fill?: string;
  isFilling?: boolean;
}

interface PropsTextInRect {
  text: string;
  x: number;
  y: number;
}

export const Rect: FC<PropsRect> = observer((props) => {
  const initialFill = (props.indexColor) ? getGrayColor(props.indexColor) : '#fff';
  
  const [fill, setFill] = useState<string>(
    (props.fill && (!props.indexColor || props.isFilling)) ? 
    props.fill : 
    initialFill
  );
  const [alpha, setAlpha] = useState<number>((props.isFilling && !props.indexColor) ? 0.5 : 1);

  const handleFilling = useCallback(() => {
    const color = coloringStore.handleFilling(props.index);
    setFill(color ? color : initialFill);
  }, [props.index, initialFill])

  const handleColoring = useCallback(() => {
    const color = coloringStore.handleColoring(props.index, setAlpha);
    setFill(color ? color : initialFill);
  }, [props.index, initialFill])
  
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
        ontap={coloringStore.data.isColoring ? handleColoring : handleFilling}
        onclick={coloringStore.data.isColoring ? handleColoring : handleFilling}
      />
      {((props.indexColor && fill === initialFill) || (props.indexColor && alpha < 1)) &&
        <TextInRect
          x={props.x + props.cellSize / 2}
          y={props.y + props.cellSize / 2}
          text={props.indexColor.toString()}
        />
      }
    </>
  )
})

const TextInRect: FC<PropsTextInRect> = memo((props) => {
  return (
    <Text 
      text={props.text}
      x={props.x}
      y={props.y}
      anchor={0.5}
      style={
        new PIXI.TextStyle({
          fill: '#333',
          fontSize: 18,
          fontFamily: 'pixel'
        })
      }
    />
  )  
})