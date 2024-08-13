import * as PIXI from 'pixi.js';
import { Graphics, Text } from "@pixi/react";
import { FC, memo, useCallback, useState } from "react"
import { HandleColoringType, HandleFillingType } from '../../types/handlersTypes';


interface PropsRect {
  x: number;
  y: number;
  cellSize: number;
  index: number;
  indexColor?: number;
  fill?: string;
  isFilling?: boolean;
  handleFilling?: (props: HandleFillingType) => void;
  handleColoring?: (props: HandleColoringType) => void;
}

interface PropsTextInRect {
  text: string;
  x: number;
  y: number;
}

export const Rect: FC<PropsRect> = memo((props) => {
  const initialFill = '#fff';
  const [fill, setFill] = useState<string>(
    (props.fill && (!props.indexColor || props.isFilling)) ? 
    props.fill : 
    initialFill
  );
  const [alpha, setAlpha] = useState<number>((props.isFilling && !props.indexColor) ? 0.5 : 1);

  const handler = () => {
    if (props.handleFilling) {
      return props.handleFilling({
        setFill: setFill, 
        initialFill: initialFill, 
        indexRect: props.index
      });
    } else if (props.handleColoring) {
      return props.handleColoring({
        setFill: setFill, 
        setAlpha: setAlpha, 
        initialFill: initialFill, 
        someFill: props.fill ? props.fill : initialFill,
        indexRect: props.index
      });
    }
  }
  
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(fill);
    g.lineStyle(1, '#b3b0b0');
    g.drawRect(props.x, props.y, props.cellSize, props.cellSize);
    g.endFill();
  }, [props, fill]);

  return (
    <>
      <Graphics 
        draw={draw}
        interactive={true}
        alpha={alpha}
        onpointerdown={handler}
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