import { Conversation, User, Message } from "@prisma/client";

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};
