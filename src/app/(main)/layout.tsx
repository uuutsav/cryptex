import SideBar from "@/components/main/sidebar";
import * as motion from "motion/react-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <motion.main className="w-screen h-screen md:flex">
      <SideBar />
      <main className="w-full p-4">{children}</main>
    </motion.main>
  );
}
