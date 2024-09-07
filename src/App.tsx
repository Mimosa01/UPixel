// import { FetchEditorPage } from "./view/EditorPage/FetchEditorPage"
import { GlobalStyled } from "./styles/global"
// import { StateFetch } from "./types/stateEditorPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./view/MainPage/MainPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  }
]);

export const App = () => {
  return (
    <>
      <GlobalStyled />
      <RouterProvider router={router} />
      {/* <FetchEditorPage state={StateFetch.NEW_EDIT}/> */}
    </>
  )
}
