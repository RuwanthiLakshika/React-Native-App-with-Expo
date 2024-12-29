import { Slot } from "expo-router";
import ClickCountProvider from "../app/ClickCountContext"; // Import your provider

// Import your global CSS file
import "../global.css";

export default function RootLayout() {
  return (
    <ClickCountProvider>
      <Slot />
    </ClickCountProvider>
  );
}
