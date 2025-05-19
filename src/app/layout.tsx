import type { Metadata } from "next";
import { IropkeBatang, Pretendard } from "@/font";
import { ToastContainer, Slide } from "react-toastify";
import QueryClientProvider from "@/lib/network/QuerycClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "날마다 에피그램 - Epigram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${Pretendard.variable} ${IropkeBatang.variable}`}
    >
      <body className="bg-background-100">
        <QueryClientProvider>{children}</QueryClientProvider>
        <ToastContainer
          position="bottom-center"
          toastStyle={{
            minHeight: "unset",
            minWidth: "unset",
            maxWidth: "80vw",
            marginBottom: "30px",
            backgroundColor: "#454545",
            color: "#ffffff",
            borderRadius: "16px",
          }}
          toastClassName="w-fit flex justify-center text-sm md:text-md"
          autoClose={2000}
          icon={false}
          closeButton={false}
          hideProgressBar
          draggable
          closeOnClick
          newestOnTop
          transition={Slide}
          limit={3}
        />
      </body>
    </html>
  );
}
