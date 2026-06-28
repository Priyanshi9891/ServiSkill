
import "./globals.css";
import AuthProvider from "../components/common/AuthProvider";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "SkillLink AI",
  description: "Hyperlocal Service & Skill Exchange Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}