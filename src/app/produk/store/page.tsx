"use client"
import React, { useState } from "react" 

export default function StoreProduk() {
    const [inputProduk, setInputProduk] = useState({
        nama_produk: '',
        jenis_produk: '',
        stok: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault
        const {name, value } = e.target;
        setInputProduk({ ...inputProduk, [name]: [value]})
    };

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault
        try {
            const respone = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produk`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'aplication/json',
                },
                body: JSON.stringify({
                    nama_produk: inputProduk.nama_produk,
                    jenis_produk: inputProduk.jenis_produk,
                    stok: inputProduk.stok,
                })
            })
            if (respone.ok) {
                console.log('berhasil menambah produk')
                window.location.href = "/produk"
            } else {
                console.error('gagal menambahkan produk')
            }
        }catch (error) {
            console.error('terjasi kesalahan', Error)
        }
    }
    return (
        <div>
            <div>
                <h3>form tambah data</h3>
                <br />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>nama Produk</label>
                    <input 
                    type="text" 
                    name="nama_produk"
                    value={inputProduk.nama_produk}
                    onChange={handleChange}/>
                    <br />
                    <label>jenis Produk</label>
                    <input 
                    type="text" 
                    name="jenis_produk"
                    value={inputProduk.jenis_produk}
                    onChange={handleChange}/>
                    <br />
                    <label>stok</label>
                    <input 
                    type="number" 
                    name="stok"
                    value={inputProduk.stok}
                    onChange={handleChange}/>
                    <button type="submit" className="btn">simpan</button>
                </form>
            </div>
        </div>
    )
}