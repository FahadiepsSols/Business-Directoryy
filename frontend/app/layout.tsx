import "./globals.css"; // Ensure the correct path to your CSS file
import { SearchProvider } from "./context/SearchContext";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <SearchProvider>
        {children}
      </SearchProvider>
      </body>
    </html>
  );
}
