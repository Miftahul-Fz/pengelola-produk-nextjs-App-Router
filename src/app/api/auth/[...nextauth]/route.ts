import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "../../db";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: "miftahul014",
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                const connection = await connect()
                try {
                    const [rows]: any = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

                    if (rows.length === 1) {
                        const user = rows[0];
                        return {
                            id: user.id,
                            full_name: user.full_name,
                            username: user.username,
                            role: user.role,
                        };
                    } 
                } catch (error) {
                    console.error('Error in SQL query:', error);
                } finally {
                    connection.end(); 
                }
                return null; 
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }: any) {
            if (account?.type === "credentials") {
                token.username = user.username;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }: any) {
            if (token) {
                session.user.username = token.username;
                session.user.fullname = token.fullname;
                session.user.role = token.role;
            }
            return session;
        },

        // async redirect({url, baseUrl}) {
        //     return '/produk'; 
        // },
        
    },
    pages: {
        signIn: '/auth/login'
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };