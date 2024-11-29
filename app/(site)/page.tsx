import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          width={100}
          height={100}
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h2 className="mt-2 text-2xl text-center font-bold tracking-tight text-zinc-900">
          Sign in to your account
        </h2>
      </div>
      {/* AUTHFORM */}
      <AuthForm />
    </div>
  );
}
