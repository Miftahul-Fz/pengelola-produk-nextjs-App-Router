"use client"
import "bootstrap/dist/css/bootstrap.min.css"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { status }: { status: string } = useSession();
  return (
    <div>
      <h1>halaman dashboard</h1>
      {status === 'authenticated' ? (
        <button 
        className="btn btn-success btn-sm cursor-pointer" 
        onClick={() => signOut()}
      > 
        LOGOUT 
      </button>
      ) : (
        <button 
        className="btn btn-success btn-sm cursor-pointer" 
        onClick={() => signIn()}
      > 
        LOGIN 
      </button>
      )}
    </div>
  )
}