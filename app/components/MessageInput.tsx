"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function MessageInput({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
}: MessageInputProps) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black py-2 px-4 w-full bg-neutral-50 rounded-lg focus:outline-none border border-zinc-200 focus:ring-0 outline-none focus-visible:ring-0 focus-visible:outline-none"
      />
    </div>
  );
}
