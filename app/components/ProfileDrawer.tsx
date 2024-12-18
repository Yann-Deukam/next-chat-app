"use client";

import { Conversation, User } from "@prisma/client";
import useOtherUsers from "../hooks/useOtherUsers";
import { Fragment, useMemo, useState } from "react";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { Trash2, X } from "lucide-react";
import Avatar from "./Avatar";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "./AvatarGroup";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & { users: User[] };
}

export default function ProfileDrawer({
  isOpen,
  onClose,
  data,
}: ProfileDrawerProps) {
  const otherUser = useOtherUsers(data);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    return data.isGroup ? `${data.users.length} members` : "Active";
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-200"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-200"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <div
                              onClick={onClose}
                              className="cursor-pointer hover:opacity-75 transition"
                            >
                              <X size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <div className="text-lg font-semibold">{title}</div>
                          <div className="text-sm text-gray-400">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                              onClick={() => setConfirmOpen(true)}
                            >
                              <div className="w-10 h-10 bg-neutral-50 rounded-lg flex justify-center items-center">
                                <Trash2 size={20} />
                              </div>
                              <div className="text-sm text-red-300">Delete</div>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-zinc-500 sm:w-40 sm:flex-shrink-0">
                                    Emails
                                  </dt>
                                  <dd className="mt-1 sm:col-span-2 text-zinc-900 text-sm">
                                    {data.users
                                      .map((user) => user.email)
                                      .join("- ")}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-zinc-900 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-zinc-900 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
