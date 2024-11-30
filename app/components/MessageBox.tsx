"use client";

import React, { useState } from "react";
import { FullMessageType } from "../types";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "./Avatar";
import { format } from "date-fns";
import Image from "next/image";
import ImageModal from "./MessageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

export default function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isOwn = session?.data?.user?.email == data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-purple-500 text-white" : "bg-zinc-50",
    data.image ? "rounded-lg p-0" : "rounded-md py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-zinc-500">{data.sender.name}</div>
          <div className="text-xs text-zinc-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="image"
              width="288"
              height="299"
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs text-green-500">read</div>
        )}
      </div>
    </div>
  );
}
