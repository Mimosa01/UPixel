import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { Provider } from 'mobx-react'
import colorStore from './store/colorStore.ts'
import coloringStore from './store/coloringStore.ts'
import editorEventsStore from './store/editorEventsStore.ts'

const store = {
  colorStore,
  coloringStore,
  editorEventsStore
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider {...store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
