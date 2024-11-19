import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import router from "./router.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
