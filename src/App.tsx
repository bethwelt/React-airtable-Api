

import * as React from "react"
import { useSelector,TypedUseSelectorHook } from "react-redux"
// import "./styles.css"
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Records } from "./components/Records"
import { Login } from "./components/StudentLogin"
import { RootState } from './store/combine';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const App: React.FC = () => {


  const { records, loading, error } = useTypedSelector((state) => state.records);
  let data = Object.entries(records);


  return (
    <main>
      <h1>Welcome !</h1>
      <Login  />
      <div>

      {
        loading ? (
          <div>Loading...</div>
        ) : (
          data.map((res: any) => (
            <Records
              key={res[0]}
              record={res}
              // removeArticle={logout}
            />
          ))
        )
      }
      </div>
     
    </main>
  )
}

export default App


