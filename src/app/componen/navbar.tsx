"use client"
import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status }: { status: string } = useSession();
  return (
    <>
      <MDBNavbar light bgColor='success'>
        <MDBContainer fluid>
          <MDBNavbarBrand  tag="span" className='mb-0 h1'>Apliksi Pengolaan Produk</MDBNavbarBrand>
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
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}