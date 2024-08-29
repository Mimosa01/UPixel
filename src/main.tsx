import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { Provider } from 'mobx-react'
import colorStore from './store/colorStore.ts'
import coloringStore from './store/coloringStore.ts'
import editorSettingsStore from './store/editor/editorSettingsStore.ts'
import scaleStore from './store/editor/scaleStore.ts'
import movingStore from './store/editor/movingStore.ts'
import handlerStore from './store/editor/handlerStore.ts'

const store = {
  colorStore,
  coloringStore,
  editorSettingsStore,
  scaleStore,
  movingStore,
  handlerStore
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider {...store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
