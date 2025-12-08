import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

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
        <Footer />
      </body>
    </html>
  );
}
