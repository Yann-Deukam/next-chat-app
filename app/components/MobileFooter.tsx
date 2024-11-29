"use client";

import React from "react";
import useRoutes from "../hooks/useRoutes";
import useConversation from "../hooks/useConversation";
import MobileItem from "./MobileItel";

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  return (
    <div className="fixed justify-between bottom-0 w-full z-40 flex items-center bg-white border-t lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
}
