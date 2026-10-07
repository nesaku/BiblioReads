import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div id="main-content" tabIndex="-1" className="focus:outline-none">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
