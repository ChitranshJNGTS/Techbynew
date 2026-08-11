
import { Toaster as HotToaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      {/* React Hot Toast */}
      <HotToaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      {/* React Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
