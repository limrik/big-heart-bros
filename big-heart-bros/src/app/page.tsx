import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import UserCard from "./components/UserCard"
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options)
  return (
    <>
    {session ? (
      <UserCard user={session?.user} pagetype={'Home'}/>
    ) : (
      redirect('/api/auth/signin?callbackUrl=/server')
    )

    }
    </>
  );
}

// redirects back to 
// if (!session) {
//  redirect('/api/auth/signin?callbackUrl=/server')
//}