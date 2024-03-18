import { AppBar } from "@/components/AppBar";
import { SendSolButton } from "@/components/SendSolButton";
import WalletContextProvider from "@/components/WalletContextProvider";
import UserBalance from "@/components/UserBalance";

export default function Home() {
  return (
    <div className={'flex flex-col items-center h-full justify-center'}>
      <UserBalance />
      <SendSolButton />
    </div>
  );
}
