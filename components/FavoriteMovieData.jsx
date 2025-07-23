import { connectDB } from "@/util/database";


export default async function FavoriteMovieData() {
    let db = (await connectDB).db("movieFinder");
    let result = await db.collection("favorite").find().toArray();

    console.log(result);

    return (
        <>
            <p> {result} </p>
        </>
    )
}