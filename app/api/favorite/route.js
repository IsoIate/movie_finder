import clientPromise from '@/lib/mongodb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {    // 즐겨찾기 된 영화목록 리스트
    try {
        const client = await clientPromise;
        const db = client.db('movieFinder');
        const session = await getServerSession(authOptions);
        let movies = null;

        if (session)
            movies = await db.collection('favorite').find({ user: session.user.email }).toArray();

        return new Response(JSON.stringify(movies), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }
}

