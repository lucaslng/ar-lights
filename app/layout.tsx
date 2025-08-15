import { ReactNode } from "react";
import "./globals.css";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div>
          <main className="mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
