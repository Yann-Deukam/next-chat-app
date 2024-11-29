import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Body from "@/app/components/Body";
import EmptyState from "@/app/components/EmptyState";
import Form from "@/app/components/Form";
import Header from "@/app/components/Header";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    console.error("No conversation found for ID:", conversationId);
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
