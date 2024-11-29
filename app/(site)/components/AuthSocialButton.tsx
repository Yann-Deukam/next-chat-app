import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

export default function AuthSocialButton({
  icon: Icon,
  onClick,
}: AuthSocialButtonProps) {
  return (
    <button
      className="inline-flex w-full justify-center bg-white px-4 py-2 text-zinc-500 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-purple-200/60 focus:outline-offset-0"
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}
