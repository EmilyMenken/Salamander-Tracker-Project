import "./globals.css";
import Navbar from "./components/NavBar";

export const metadata = {
  title: "My App",
  description: "With navbar"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
