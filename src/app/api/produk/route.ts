import { NextRequest, NextResponse } from "next/server";
import { connect } from "../db";

export async function GET(request: NextRequest) {
        try {
            const connection = await connect();
            const [rows] = await connection.query('SELECT * FROM produk');
            console.log(rows) 
            connection.release();

            return NextResponse.json ({ data : rows, message: "daftar semua produk" });

        } catch (error) {
            console.error("Error querying database:", error);
            return NextResponse.json ({ status: 500, message: "internal server error" });
        }
}
export async function POST(request: NextRequest) {
    const {nama_produk, jenis_produk, stok } = await request.json();
    try {
        const connection = await connect();
        await connection.query('INSERT INTO produk (nama_produk, jenis_produk, stok) VALUES (?, ?, ?)', [nama_produk, jenis_produk, stok]);
        connection.release();

        return NextResponse.json ({data: { nama_produk, jenis_produk, stok }})
    } catch (error) {
        console.error("Error querying database:", error);
        return NextResponse.json ({ status: 500, message: "internal server error" });
    }
}



