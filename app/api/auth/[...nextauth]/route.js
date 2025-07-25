import clientPromise from '@/lib/mongodb';
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),

        CredentialsProvider({
            // 로그인페이지 폼 생성 
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            // 로그인 요청시 실행되는코드
            async authorize(credentials) {
                let db = (await clientPromise).db('movieFinder');
                let user = await db.collection('user_data').findOne({ email: credentials.email })
                if (!user) {
                    console.log('존재하지 않는 이메일입니다.');
                    return null
                }
                const pwcheck = await bcrypt.compare(credentials.password, user.password);
                if (!pwcheck) {
                    console.log('아이디 또는 비번번호가 틀립니다.');
                    return null
                }
                return user
            }
        })
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30일
    },


    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name
                token.user.email = user.email
                token.user.role = user.role
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
