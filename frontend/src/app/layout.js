import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "../components/DisableDraftMode";
import { SanityLive } from "../sanity/live";
import NavBar from "../components/NavBar/NavBar";
import GlobalStyle from "./GlobalStyle";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <NavBar />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
