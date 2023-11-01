"use client"
import React, { FormEvent, useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css"

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { push } = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
        callbackUrl: '/produk'
      });

      if (!response?.error) {
        push('/produk');
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h3 style={{fontFamily: "times new roman"}}>FORM LOGIN</h3>
      <form onSubmit={handleLogin}>
        <MDBInput
          wrapperClass='mb-4'
          label='Username'
          type='text'
          name='username'
          value={formData.username}
          onChange={handleInputChange}
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Password'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        <MDBBtn type='submit' className="mb-4">Sign in</MDBBtn>
      </form>
      <div className="text-center">
        <p>Not a member? <a href="/auth/register">Register</a></p>
        {/* <p>or sign up with:</p> */}
      </div>
    </MDBContainer>
  );
}
