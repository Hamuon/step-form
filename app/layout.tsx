import "@/styles/globals.css";
import AuthProvider from "@/context/AuthProvider";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Image src="/media/sms.gif" alt="background" fill className="fixed object-cover" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
