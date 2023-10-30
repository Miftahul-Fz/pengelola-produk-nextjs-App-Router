"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

interface Produk {
    id: number,
    nama_produk: string,
    jenis_produk: string,
    stok: number,
}

export default function IndexProduk() {
    const [produks, setProduk] = useState<Produk[]>([]);;
    
    useEffect(() => {
    const fetchBarang = async () => {
        try {
            const respone = await fetch('http://localhost:3000/api/produk', {
                headers: {
                    accept: 'application/json'
                }
            })
            if (respone.ok) {
                const dataProduk = await respone.json();
                console.log('produk : ', dataProduk.data)
                setProduk(dataProduk.data)
                return dataProduk.data;
            } else {
                throw new Error("Gagal mengambil data Produk");
            }
        }catch (error) {
            console.error('Terjadi kesalahan', error);
            throw error;
        }; 
    }

        fetchBarang()
    }, [setProduk])

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/produk/:?id=${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(produks)
            })
            if (response.ok) {
                setProduk((prevProduk) => prevProduk.filter((produk) => produk.id !== id));
            } else {
                console.error('Gagal menghapus produk');
            }
        } catch (error) {
            console.error('terjasi keasalahan', Error)
        }
    }

    return (
        <div>
            <div>
                <h3>daftar Produk</h3>
            </div>
            <div>
                <Link href={'produk/store'}>
                <button>tambah data</button>
                </Link>
                <table border={1} width="100%">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>nama Produk</th>
                            <th>jenis_prodiuk</th>
                            <th>stok</th>
                            <th>tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produks.map((produk, item) => (
                            <tr key={produk.id}>
                                <td> { item +1} </td>
                                <td> { produk.nama_produk } </td>
                                <td> { produk.jenis_produk} </td>
                                <td> { produk.stok } </td>
                                <td>
                                    <Link href={`produk/edit/${produk.id}`}>
                                        <button>edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(produk.id)}>hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}