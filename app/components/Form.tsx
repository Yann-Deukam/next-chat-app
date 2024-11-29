"use client";
import useConversation from "../hooks/useConversation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Image, Send } from "lucide-react";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

export default function Form() {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post(`/api/messages`, { ...data, conversationId });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex gap-2 items-center lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="kq5hdwuv"
      >
        <span className="text-purple-500">
          <Image size={30} />
        </span>
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 w-full lg:gap-4 items-center"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-lg p-3 bg-purple-500 cursor-pointer hover:bg-purple-600 transition"
        >
          <span className="text-white">
            <Send size={18} />
          </span>
        </button>
      </form>
    </div>
  );
}
