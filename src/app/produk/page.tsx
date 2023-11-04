"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import "bootstrap/dist/css/bootstrap.min.css"

interface Produk {
    id: number,
    nama_produk: string,
    jenis_produk: string,
    stok: number,
}

export default function IndexProduk() {
    const [produks, setProduk] = useState<Produk[]>([]);

    const { data: session, status }: { data: any, status: string } = useSession();
    const router = useRouter();
    console.log('session: ', session?.user);
    console.log('status: ', status);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else {
            if (session !== undefined && session?.user.role !== 'admin') {
                router.push('/');
            }
        }
    }, [router, session, session?.user.role, status]);

    useEffect(() => {
    const fetchBarang = async () => {
        try {
            const respone = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produk`, {
                headers: {
                    accept: 'application/json' 
                }
            })
            if (respone.ok) {
                const dataProduk = await respone.json();
                // console.log('produk : ', dataProduk.data)
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produk/:?id=${id}`,{
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
            <br />
            <div>
                <Link href={'produk/store'}>
                <button>tambah data</button>
                </Link>
                <br />
                <br />
                <table className="table table-bordered border-primary">
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