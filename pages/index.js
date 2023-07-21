import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const {user} = useUser();
  console.log(user);
  
  return (
    
    <div>
      <h1>This is our homepage.</h1>
      <div> 
        {!!user ? (
            <>
              <div>
                <Image src={user.picture} alt={user.name} width={50} height={50} />
              </div> 
              {/* <div>{user.name}</div> */}
              <div>{user.nickname}</div>
              <Link href="/api/auth/logout">Logout</Link>
            </>
          ) : 
            <Link href="/api/auth/login">Login</Link>
          }
      </div>
    </div>
  )

}
