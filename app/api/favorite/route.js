import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('movieFinder');
        const movies = await db.collection('favorite').find({}).toArray();

        return new Response(JSON.stringify(movies), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('movieFinder');
        const body = await request.json();
        let result = null;

        console.log(body.isFavorite)

        if (body.isFavorite)
            result = await db.collection(`favorite`).insertOne({ movieId: body.movieId });
        else
            result = await db.collection(`favorite`).deleteOne({ movieId: body.movieId });

        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }
}
