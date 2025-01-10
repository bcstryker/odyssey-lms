import {NextResponse} from "next/server";
import Question from "@/models/Question";
import {authenticateUser} from "@/utils/auth";
import {connectDB} from "@/utils/db";

export async function GET(req: Request) {
  console.log("GET /api/questions");

  try {
    await connectDB();
    const user = await authenticateUser(req);

    if (!user) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const sectionId = url.searchParams.get("sectionId");

    if (id) {
      const question = await Question.findOne({questionId: id}).lean();
      if (!question) {
        return NextResponse.json({error: "Question not found or access denied"}, {status: 404});
      }
      return NextResponse.json(question, {status: 200});
    }

    if (sectionId) {
      const questions = await Question.find({sectionId}).lean();
      if (!questions || questions.length === 0) {
        return NextResponse.json({error: "No questions found for this section"}, {status: 404});
      }
      return NextResponse.json(questions, {status: 200});
    }

    return NextResponse.json({error: "Bad request: No query parameters provided"}, {status: 400});
  } catch (error) {
    console.error("Error in GET /api/questions:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
