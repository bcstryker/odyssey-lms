import {NextResponse} from "next/server";
import Topic from "@/models/Topic";
import {authenticateUser} from "@/utils/auth";
import {connectDB} from "@/utils/db";

export async function GET(req: Request) {
  console.log("GET /api/topics");

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
      const topic = await Topic.findOne({topicId: id}).lean();
      if (!topic) {
        return NextResponse.json({error: "Topic not found or access denied"}, {status: 404});
      }
      return NextResponse.json(topic, {status: 200});
    }

    if (sectionId) {
      const topics = await Topic.find({sectionId}).lean();
      return NextResponse.json(topics, {status: 200});
    }

    return NextResponse.json({error: "Bad request: No query parameters provided"}, {status: 400});
  } catch (error) {
    console.error("Error in GET /api/topics:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
