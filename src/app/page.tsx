import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "../components/UserCard"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <div className="flex flex-col items-center">
      <div>
        {session ? (
          <UserCard user={session?.user} pagetype={"Home"} />
        ) : (
          <h1 className="text-5xl">You Shall Not Pass!</h1>
        )}
      </div>
      <div className="mt-24">
        <Link href={"/create"} className={buttonVariants({
          className: "w-32 h-12 mr-20"
        })}>Create Quizz</Link>
        <Link href={"/join"} className={buttonVariants({
          className: "w-32 h-12 ml-20"
        })}>Join Quizz</Link>
      </div>
    </div>
  )
}
