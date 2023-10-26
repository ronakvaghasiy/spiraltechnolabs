import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { Notifications } from "@mantine/notifications";
import Navbar from "@/src/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Notifications position="top-center" />
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}
