import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import db, { connect } from "../../db";

interface Produk {
    id: number
    nama_produk: string;
    jenis: string;
    stok: number
}

export async function GET(request: NextRequest, response: NextResponse) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('URL:', request.url);
    console.log('searchParams : ', searchParams.get('id'));
    try { 
        const connection = await connect();
        const [rows]: any[0] = await connection.query('SELECT * FROM produk WHERE id = ? limit 1', [id]);
        connection.release();
        if (rows.length === 1) { 
            console.log('data', rows)
            return NextResponse.json({ data: rows[0], message: 'Detail data produk' });
            // res.status(200).json({data: rows, message: 'daftar data barang' });
        } else {
            return NextResponse.json({ message: 'Not Found | Data tidak ditemukan', status: 404 })

        }
    } catch (error) {
        console.error("Error querying database:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}
export async function PATCH(request: NextRequest) {
    const { searchParams }= new URL(request.url);
    const id = searchParams.get('id');
    const {nama_produk, jenis_produk, stok } = await request.json();
    try {
        const connection = await connect();
        const [rows]: any = await connection.query('UPDATE produk SET nama_produk = ?, jenis_produk = ?, stok = ? WHERE id = ?', [nama_produk, jenis_produk, stok, id]);
        connection.release();
        if (rows.affectedRows > 0) {
            return NextResponse.json({data: {id, nama_produk, jenis_produk, stok} ,message: 'data berhasil di perbaharui'})
        } else {
            return NextResponse.json({message: 'produk tidak ditemukan'})
        }
    } catch (error) {
        console.error("Error querying database:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        const connection = await connect(); 
        const [rows]: any = await connection.query('DELETE FROM produk WHERE id = ?', [id]);
        connection.release();
        if (rows.affectedRows > 0) {
            return NextResponse.json({message: "produk berhasil di hapus"});
        } else {
            return NextResponse.json({message: "produk tidak di temukan "});
        }
    } catch (error) {
        console.error("Error querying database:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}