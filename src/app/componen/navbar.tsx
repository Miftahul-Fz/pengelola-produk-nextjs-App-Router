"use client"
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status }: { status: string } = useSession();
  return (
    <>
      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Aplikasi</a>
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
      </nav>
    </>
  );
}