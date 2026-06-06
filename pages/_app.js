import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

/**
 * @param {{ Component: React.ComponentType, pageProps: object }} props
 * @returns {JSX.Element}
 */
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
