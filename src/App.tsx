import { FetchEditorPage } from "./view/EditorPage/FetchEditorPage"
import { GlobalStyled } from "./styles/global"
import { StateFetch } from "./types/stateEditorPage"

export const App = () => {
  return (
    <>
      <GlobalStyled />
      <FetchEditorPage state={StateFetch.NEW_EDIT}/>
    </>
  )
}
