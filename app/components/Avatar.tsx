"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-lg overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="avatar"
          src={user?.image || "/images/avatar-placeholder.jpeg"}
          fill
        />
      </div>
      <span className="absolute block rounded-full ring-1 ring-white bg-green-500 top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
    </div>
  );
}
