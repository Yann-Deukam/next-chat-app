import React from "react";

export default function EmptyState() {
  return (
    <div className="px-4 py-10 sm:py-6 lg:py-8 h-full flex justify-center items-center bg-zinc-50">
      <div className="text-center items-center flex flex-col">
        <h3 className="text-2xl font-semibold text-zinc-300">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
}
