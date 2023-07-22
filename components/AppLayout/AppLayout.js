import { useUser } from "@auth0/nextjs-auth0/client";
import { faRightFromBracket, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../Logo";

export const AppLayout = ({ children }) => {
    const {user} = useUser();
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col overflow-hidden text-my-white">
                <div className="bg-my-darkblue px-5">
                    <div className="">
                        <Link href="/"> <Logo /> </Link>
                    </div>
                    <Link href="/post/new" className="text-my-white bg-my-lightblue w-64 text-center cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-my-white hover:text-my-black transition-colors block text-heading-500 tracking-widest mx-auto">New Post</Link>
                    <Link href="/buybucks" className="block mt-2 text-center py-2">
                        <FontAwesomeIcon icon={faSackDollar} className="text-my-yellow"/>
                        <span className="pl-2">50 Quillbucks</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto bg-gradient-to-b from-my-darkblue to-my-black"> list of posts</div>
                <div className="bg-my-black flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
                    {!!user ? (
                        <>
                            <div className="min-w-[50px]">
                                <Image src={user.picture} alt={user.name} width={50} height={50} className="rounded-lg border-my-white border-2 "/>
                            </div> 
                            <div className="flex-1 flex justify-between px-2">
                                <div className="tracking-wider">
                                    {user.nickname}{user.email}
                                </div>
                                <Link href="/api/auth/logout" className="pr-6">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </Link>
                            </div>
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