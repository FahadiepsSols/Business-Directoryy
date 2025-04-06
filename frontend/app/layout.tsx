import "./globals.css"; // Ensure the correct path to your CSS file
import { SearchProvider } from "./context/SearchContext";
import { ClerkProvider } from '@clerk/nextjs';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ClerkProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
      </ClerkProvider> 
      </body>
    </html>
  );
}
