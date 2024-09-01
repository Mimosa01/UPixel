import { FC, memo } from "react";
import { Text } from "@pixi/react";
import * as PIXI from 'pixi.js';

interface PropsTextInRect {
  text: string;
  x: number;
  y: number;
}

export const TextInRect: FC<PropsTextInRect> = memo((props) => {
  return (
    <Text 
      text={props.text}
      x={props.x}
      y={props.y}
      anchor={0.5}
      eventMode="none"
      style={
        new PIXI.TextStyle({
          fill: '#333',
          fontSize: 18,
          fontFamily: 'pixel',
        })
      }
    />
  )  
})