import { useUser } from "@auth0/nextjs-auth0/client";
import { faRightFromBracket, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Logo } from "../Logo";



export const AppLayout = ({ children, posts}) => {
    const {user, isLoading} = useUser();
    // functionality for displaying quillbucks and current selectedpost
    const [quillbucks, setQuillbucks] = useState(0);
    const asPath = useRouter().asPath;
    const selectedPost = asPath.split('/').pop() || null;

    useEffect(() => {
        if(!isLoading && user){
            axios.get('/api/checkbucks').then((response) => {
                setQuillbucks(response.data.availableQuillbucks);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [user, isLoading]);




    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col overflow-hidden text-my-white">
                <div className="bg-my-darkblue px-5">
                    <div className="">
                        <Link href="/"> <Logo /> </Link>
                    </div>
                    <Link href="/post/new" className="text-my-white bg-my-lightblue w-64 text-center cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-my-white hover:text-my-black transition-colors block text-heading-500 tracking-widest mx-auto">New Post</Link>
                    <Link href="/purchase" className="block mt-2 text-center py-2">
                        <FontAwesomeIcon icon={faSackDollar} className="text-my-yellow"/>
                        <span className="pl-2">{quillbucks} Quillbucks</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto bg-gradient-to-b from-my-darkblue to-my-black scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-rounded-sm">
                    <div>
                    {posts.map((post, index) => {
                        // console.log(`post._id: ${post._id}, selectedPost: ${selectedPost}`);
                            return (
                                <Link
                                href={`/post/${post._id}`}
                                key={index}
                                className={`block text-white text-ellipsis overflow-hidden whitespace-nowrap my-4 mx-3 px-3 py-2 cursor-pointer rounded-md ${
                                    post._id == selectedPost ? "bg-my-midblue border border-white" : "bg-white bg-opacity-10"
                                }`}>
                                    {post.title.replace(/<\/?[^>]+(>|$)/g, "")}
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="bg-my-black flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
                    {!!user ? (
                        <>
                            <div className="min-w-[50px]">
                                <Image src={user.picture} alt={user.name} width={50} height={50} className="rounded-lg border-my-white border-2 "/>
                            </div> 
                            <div className="flex-1 flex justify-between p-2 grid grid-cols-8">
                                <div className="tracking-wider pl-1 col-span-7 overflow-hidden">
                                    {user.nickname}
                                </div>
                                <Link href="/api/auth/logout" className="col-span-1 px-2">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </Link>
                            </div>
                        </>
                    ) : 
                        <Link href="/api/auth/login">Login</Link>
                    }
                </div>
            </div>
            {children}
        </div>
    )
}