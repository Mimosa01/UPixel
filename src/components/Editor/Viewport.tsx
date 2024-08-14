import { PixiComponent, useApp } from '@pixi/react'
import { IViewportOptions, Viewport as PixiViewport } from 'pixi-viewport'
import * as PIXI from 'pixi.js'
import { forwardRef, ReactNode } from 'react'

export interface ViewportProps {
	children?: ReactNode
}

export interface PixiComponentViewportProps extends ViewportProps {
	app: PIXI.Application
}

class PixiViewportPatch extends PixiViewport {
  private renderedDOMElement?: HTMLElement;

  constructor(options: IViewportOptions) {
      super(options);

      this.lockDOMElement();
  }

  lockDOMElement() {
      this.renderedDOMElement = this.options.events.domElement;

      return this;
  }

  patchEvents() {
      if (this.renderedDOMElement) {
          this.options.events.domElement = this.renderedDOMElement;
      }
  }

  releaseDOMElement() {
      this.renderedDOMElement = undefined;
  }
}

const PixiViewportComponent = PixiComponent('Viewport', {
	create: (props: PixiComponentViewportProps) => {
    const {events} = props.app.renderer;

    const instance = new PixiViewportPatch({
      worldWidth: 1000,
      worldHeight: 1000,
      ticker: props.app.ticker,
			allowPreserveDragOutside: true,
			passiveWheel: false,
      events: events,
    });

		instance
			.drag({
				clampWheel: false,
        factor: 0.5,
			})
			.wheel({
				percent: 0.1,
				trackpadPinch: true,
			})
      .pinch({
        noDrag: true,
      })
			.clampZoom({
				minScale: 1,
				maxScale: 5,
			})

    return instance
	},

  willUnmount: (instance: PixiViewportPatch) => {
    instance.options.noTicker = true;
    instance.patchEvents();
    instance.destroy({children: true, texture: true, baseTexture: true});
    instance.releaseDOMElement();
  }
})

const Viewport = forwardRef<null, ViewportProps>(function Viewport(props: ViewportProps, ref: React.Ref<PixiViewportPatch>) {
  const app = useApp();

  return <PixiViewportComponent ref={ref} app={app} {...props} />;
});

export default Viewport