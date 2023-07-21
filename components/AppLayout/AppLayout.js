import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

export const AppLayout = ({ children }) => {
    const {user} = useUser();
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col overflow-hidden text-white">
                <div className="bg-slate-800">
                    <div className="">logo</div>
                    <div className="">cta button</div>
                    <div className="">quillbucks</div>
                </div>
                <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-700"> list of posts</div>
                <div className="bg-cyan-700 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
                    {!!user ? (
                        <>
                        <div>
                            <Image src={user.picture} alt={user.name} width={50} height={50} />
                        </div> 
                        <div className="text-bold">
                            <div>{user.nickname}</div>
                        </div>
                        <Link href="/api/auth/logout">Logout</Link>
                        </>
                    ) : 
                        <Link href="/api/auth/login">Login</Link>
                    }
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}