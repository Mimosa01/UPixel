import * as PIXI from 'pixi.js';
import { Graphics } from "@pixi/react";
import { FC, useCallback, useMemo, useState } from "react"
import { observer } from 'mobx-react';
import handlerStore from '../../store/handlerStore';
import editorSettingsStore from '../../store/editor/editorSettingsStore';


interface PropsRect {
  x: number;
  y: number;
  cellSize: number;
  index: number;
  fill: string | undefined;
}

export const RectFilling: FC<PropsRect> = observer((props) => {
  // Без этого не работает
  useMemo(() => new PIXI.BlurFilter(0), []);

  const initialFill: string = '#fff';

  const [fill, setFill] = useState<string>(props.fill ? props.fill : initialFill);

  const handleFilling = useCallback(() => {
    if (!handlerStore.isMove && !handlerStore.isScale && handlerStore.isClick) {
      const color = handlerStore.handleFilling(props.index);
      setFill(color ? color : initialFill);
    }
  }, [props.index, initialFill]);

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(fill);
    g.lineStyle(0.5, '#e5e5e5', 0.5);
    g.drawRect(props.x, props.y, props.cellSize, props.cellSize);
    g.endFill();
  }, [props, fill]);

  return (
    <Graphics 
      draw={draw}
      interactive={true}
      eventMode='dynamic'
      ontap={handleFilling}
      onclick={handleFilling}
      visible={editorSettingsStore.scale === 1 && fill === initialFill ? false : true}
    />
  )
})
