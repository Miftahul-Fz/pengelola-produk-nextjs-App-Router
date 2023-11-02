// "use client"
// import React, { useState } from "react"
// import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
// import "bootstrap/dist/css/bootstrap.min.css"


// export default function Register() {
//     const [register, setRegister] = useState({
//         username: '',
//         full_name: '',
//         password: '',
//         role: '',
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const {name, value} = e.target;
//         setRegister({...register, [name]: [value]})
//     }

//     const handleRegister = async (e: React.FormEvent<HTMLElement>) => {
//         e.preventDefault();
//         try {
//             const respone = await fetch('http://localhost:3000/api/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                     Accept: 'aplication/json',
//                 },
//                 body: JSON.stringify({
//                     username: register.username,
//                     full_name: register.full_name,
//                     password: register.password,
//                     role: register.role
//                 })
//             })
//             if (respone.ok) {
//                 console.log('anda berhasil melakukan register');
//                 window.location.href = "/auth/login"
//             } else {
//                 console.log('gagal melakukan register')
//             } 
//         }catch (error) {
//             console.error('terjasi kesalahan', Error)
//         }
//     }

//     return(
//         <div><MDBContainer className="p-3 my-5 d-flex flex-column w-50">
//         <h3 style={{fontFamily: "times new roman"}}>FORM REGISTER</h3>
//         <form onSubmit={handleRegister}>
//           <MDBInput
//             wrapperClass='mb-4'
//             label='Username'
//           type='text'
//             name='username'
//             value={register.username}
//             onChange={handleChange}
//           />
//           <MDBInput
//             wrapperClass='mb-4'
//             label='Nama Lengkanp'
//             type='text'
//             name='full_name'
//             value={register.full_name}
//             onChange={handleChange}
//           />
//           <MDBInput
//             wrapperClass='mb-4'
//             label='Password'
//             type='password'
//             name='password'
//             value={register.password}
//             onChange={handleChange}
//           />
//           <MDBInput
//             wrapperClass='mb-4'
//             label='Role'
//             type='text'
//             name='role'
//             value={register.role}
//             onChange={handleChange}
//           />
//           <MDBBtn type='submit' className="mb-4">Sign up</MDBBtn>
//         </form>
        
//       </MDBContainer></div>
//     )
// }