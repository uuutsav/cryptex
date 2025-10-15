import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import * as motion from "motion/react-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <motion.main className="w-full h-full relative">
        {children}
      </motion.main>
      <Footer />
    </>
  );
}
