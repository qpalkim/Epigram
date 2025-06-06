import type { Metadata } from "next";
import { IropkeBatang, Pretendard } from "@/font";
import { ToastContainer, Slide } from "react-toastify";
import QueryClientProvider from "@/lib/network/QuerycClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://epigram-sand.vercel.app"),
  title: "날마다 에피그램 - Epigram",
  description:
    "나만 알던 소중한 글들을 다른 사람들에게 전파하고, 내 마음에 담긴 감정을 확인해 보세요.",
  openGraph: {
    title: "날마다 에피그램 - Epigram",
    description:
      "나만 알던 소중한 글들을 다른 사람들에게 전파하고, 내 마음에 담긴 감정을 확인해 보세요.",
    images: ["/thumbnail.jpg"],
  },
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
