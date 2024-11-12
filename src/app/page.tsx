import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Link href='/chatBox'>
      <p className="text-[15px] h-[60px] leading-[60px] px-10 rounded-xl cursor-pointer font-bold bg-[#0A96D4] text-white">
        Open Chatbox
      </p>
      </Link>     
    </div>
  );
}
