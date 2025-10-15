import Container from "../global/container";
import { RetroGrid } from "../ui/retro-grid";

const Footer = () => {
  return (
    <Container>
      <div className="my-10 relative flex h-[500px] w-full max-w-5xl mx-auto flex-col items-center justify-center overflow-hidden pt-20 md:pt-32">
        <h1 className="text-4xl md:text-7xl md:leading-tight font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-950 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50 z-50">
          Elevate your <br />
          experience with us
        </h1>

        <RetroGrid />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#121212]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#121212]"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-[#121212]"></div>
      </div>
      <p className="text-sm mb-10 text-secondary-foreground text-center font-medium">
        &copy; {new Date().getFullYear()} Cryptex. All rights reserved.
      </p>
    </Container>
  );
};

export default Footer;
