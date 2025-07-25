import { connectDB } from "@/util/database";
import bcrypt from "bcryptjs";
import { timeString, date } from "../common/common"

export default async function handler(request, response) {
  if (request.method === "POST") {
    if (request.body.name != '' && request.body.email != '' && request.body.password != '') {
      const hash = await bcrypt.hash(request.body.password, 10);
      request.body.password = hash;

      let db = (await connectDB).db('favorite');
      let isEmail = await db.collection('user_data').findOne({ email: request.body.email });

      if (!isEmail) {
        request.body.role = 'user';
        request.body.registDate = date;
        request.body.registTime = timeString;

        await db.collection('user_data').insertOne(request.body);
        response.status(200).json('정상적으로 회원가입 되었습니다.');
      }
      else
        response.status(500).json('이미 존재하는 이메일입니다.');
    }
  }
  else {
    response.status(500).json('공백이 존재합니다.');
  }
}; 