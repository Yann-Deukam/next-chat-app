"use client";

import { useRouter } from "next/navigation";
import useConversation from "../hooks/useConversation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversation/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <span className="h-6 w-6 text-red-600">
            <AlertTriangle />
          </span>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            className="text-base font-semibold leading-6 text-zinc-900"
            as="h3"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} onClick={onDelete} danger>
          Delete
        </Button>
        <Button type="button" disabled={isLoading} onClick={onClose} secondary>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
