"use client"
import { useParams } from "next/navigation";
import React, {useState, useEffect} from "react";
import { useForm, SubmitHandler } from "react-hook-form";


interface Produk {
    id: number;
    nama_produk: string;
    jenis_produk: string;
    stok: number;
}

interface formProduk {
    nama_produk: string;
    jenis_produk: string;
    stok: number;
}   

export default function EditProduk() {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm<formProduk>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [editProduk, setEditProduk] = useState<Produk>()

    useEffect(() => {
        if (id) {
          fetch(`http://localhost:3000/api/produk/:?id=${id}`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
        })
            .then((Response) => Response.json())
            .then((produk) => {
                console.log('produk berdasarkan id: ', produk.data);
                setEditProduk(produk.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('terjadi kesalahan', error);
                setIsLoading(false); 
            });
        }
    }, [id]);

    const onSubmit: SubmitHandler<formProduk> = (data) => {
        fetch(`http://localhost:3000/api/produk/:?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Data berhasil diupdate', result);
           window.location.href = '/produk'
        })
        .catch((error) => {
            console.error('Terjadi kesalahan saat mengirim data', error);
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
            <h3>form tambah data</h3>
            <br />
        </div>
        <div>
            {editProduk ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nama Produk</label>
                        <input type="text" {...register('nama_produk')} defaultValue={editProduk.nama_produk} />
                    </div>
                    <div>
                        <label>Jenis Produk</label>
                        <input type="text" {...register('jenis_produk')} defaultValue={editProduk.jenis_produk} />
                    </div>
                    <div>
                        <label>Stok</label>
                        <input type="number" {...register('stok')} defaultValue={editProduk.stok} />
                    </div>
                    <button type="submit">update</button>
                </form>
            ) : (
                <div>Data tidak ditemukan</div>
            )}
        </div>
        </div>
    )
}