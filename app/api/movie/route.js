import clientPromise from '@/lib/mongodb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {    // 해당 영화가 즐겨찾기 목록에 있는지 조회
    try {
        const client = await clientPromise;
        const db = client.db('movieFinder');
        const { searchParams } = new URL(request.url);
        const movieId = searchParams.get("movieId");
        const session = await getServerSession(authOptions);
        let favorite = null;

        if (session)
            favorite = await db.collection('favorite').findOne({ movieId: movieId, user: session.user.email });

        return new Response(JSON.stringify(favorite), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }
}

export async function POST(request) {   // 해당 영화 즐겨찾기 추가 삭제
    try {
        const client = await clientPromise;
        const db = client.db('movieFinder');
        const body = await request.json();
        const session = await getServerSession(authOptions);
        let result = null;

        if (session) {
            if (body.isFavorite)
                result = await db.collection(`favorite`).insertOne({ movieId: body.movieId, user: session.user.email });
            else
                result = await db.collection(`favorite`).deleteOne({ movieId: body.movieId });
        }

        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }
}
