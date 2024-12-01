import { useChat } from "./chat-provider";

type ChatThreadsProps = {
  isThreadListOpen: boolean;
};

export default function ChatThreads({ isThreadListOpen }: ChatThreadsProps) {
  const { threads, removeThread, onSelectThread } = useChat();

  return <div className="flex flex-col gap-2 p-4">Chat threads</div>;
}
