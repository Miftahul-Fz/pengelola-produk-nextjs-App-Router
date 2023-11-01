import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../db"

export async function POST(request:NextRequest) {
    const {username, full_name, password, role } = await request.json();
    try {
        const connection = await connect();
        await connection.query('INSERT INTO users (username, Full_name, password, role) VALUES (?, ?, ?, ?)', [username, full_name, password, role])
        connection.release();

        return NextResponse.json ({message: 'anda berhasil melalukan register'})
    } catch (error) {
        console.error("Error querying database:", error);
        return NextResponse.json ({ status: 500, message: "internal server error" });
    }
} 