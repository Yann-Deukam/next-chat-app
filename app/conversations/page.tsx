"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

export default function page() {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:inline-block",
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
}
