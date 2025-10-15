"use client";

import {
  IconBrandTabler,
  IconChartBar,
  IconNews,
  IconArrowBarToLeft,
  IconTrophy,
} from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Image from "next/image";
import * as motion from "motion/react-client";
import Icons from "../global/icons";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { UserContext } from "@/contexts/UserContext";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconBrandTabler className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Trade",
    href: "/trade",
    icon: <IconChartBar className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "News",
    href: "/news",
    icon: <IconNews className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    icon: <IconTrophy className="h-5 w-5 flex-shrink-0" />,
  },
];

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useContext(UserContext);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo open={open} />
          <div className="mt-8 flex flex-col gap-2 ml-1">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <ThemeSwitcher className="w-7" />
          {isLoaded && (
            <SidebarLink
              link={{
                label: user?.name ? user.name : "User",
                href: "/profile",
                icon: (
                  <Image
                    src={user?.avatar ? user.avatar : ""}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          )}
          <SidebarLink
            className="ml-1 text-red-500"
            link={{
              label: "Logout",
              href: "/logout",
              icon: <IconArrowBarToLeft className="h-5 w-5 flex-shrink-0" />,
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export const Logo = ({ open }: { open: boolean }) => {
  return (
    <div className="font-normal flex items-center text-sm py-1 relative z-20">
      <Icons.logo
        size={8}
        className="h-8 min-w-8 w-8 transition-all ease-in-out"
      />
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="font-semibold text-xl whitespace-pre"
        >
          cryptex
        </motion.span>
      )}
    </div>
  );
};

export default SideBar;
