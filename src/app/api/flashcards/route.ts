import {NextResponse} from "next/server";
import FlashCard from "@/models/FlashCard";
import {authenticateUser} from "@/utils/auth";
import {connectDB} from "@/utils/db";

export async function GET(req: Request) {
  console.log("GET /api/flashcards");

  try {
    await connectDB();
    const user = await authenticateUser(req);

    if (!user) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const url = new URL(req.url);
    const sectionId = url.searchParams.get("sectionId");

    if (sectionId) {
      const flashcards = await FlashCard.find({sectionId}).lean();
      if (flashcards.length === 0) {
        return NextResponse.json({error: "No flashcards found for this section"}, {status: 404});
      }
      return NextResponse.json(flashcards, {status: 200});
    }

    return NextResponse.json({error: "Bad request: No query parameters provided"}, {status: 400});
  } catch (error) {
    console.error("Error in GET /api/flashcards:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
