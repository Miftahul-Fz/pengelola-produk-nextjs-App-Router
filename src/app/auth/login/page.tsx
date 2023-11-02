"use client"
import React, { useState } from 'react';
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
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={handleLogin}>
              <div className="form-group">
                <label>username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="masukan usrname"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                 type="password"
                 className="form-control"
                 name="password"
                 placeholder="masukan password"
                 value={formData.password}
                 onChange={handleInputChange}
                  />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
