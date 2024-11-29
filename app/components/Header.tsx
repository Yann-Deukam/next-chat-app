"use client";

import { Conversation, User } from "@prisma/client";
import useOtherUsers from "../hooks/useOtherUsers";
import { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Avatar from "./Avatar";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export default function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUsers(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);
  return (
    <div className="bg-white w-full flex border border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations"
          className="lg:hidden block text-purple-500 hover:text-purple-600 transition cursor-pointer"
        >
          <ChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-xs font-light text-zinc-400">{statusText}</div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        className="text-zinc-500 hover:text-zinc-600 transition cursor-pointer"
        onClick={() => {}}
      />
    </div>
  );
}
