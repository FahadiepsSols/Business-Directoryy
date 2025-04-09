import "./globals.css"; 
import { SearchProvider } from "./context/SearchContext";
import { ClerkProvider } from '@clerk/nextjs';
import Header from "./components/header";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ClerkProvider>
      <SearchProvider>
        <Header/>
        {children}
      </SearchProvider>
      </ClerkProvider> 
      </body>
    </html>
  );
}
