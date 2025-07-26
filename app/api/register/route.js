import clientPromise from '@/lib/mongodb';
import bcrypt from "bcryptjs";

export async function POST(request) {

    const body = await request.json();

    if (body.name != '' && body.email != '' && body.password != '') {
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;

        let db = (await clientPromise).db('movieFinder');
        let isEmail = await db.collection('user_data').findOne({ email: body.email });

        if (!isEmail) {
            await db.collection('user_data').insertOne(body);
            return new Response(JSON.stringify({ message: '회원가입 완료', data: body }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        else {
            return new Response(JSON.stringify({ error: '이미 존재하는 이메일입니다.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
}; 