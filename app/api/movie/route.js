import clientPromise from '@/lib/mongodb';

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db('movieFinder');
        const { searchParams } = new URL(request.url);
        const movieId = searchParams.get("movieId");
        const favorite = await db.collection('favorite').findOne({ movieId: movieId });

        // console.log(movieId)
        // console.log(favorite)

        return new Response(JSON.stringify(favorite), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }
}