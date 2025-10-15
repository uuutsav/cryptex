import * as motion from "motion/react-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <motion.main className="w-screen h-screen">
      {children}
    </motion.main>
  );
}
