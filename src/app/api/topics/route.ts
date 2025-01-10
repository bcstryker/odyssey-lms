import {NextResponse} from "next/server";
import Topic from "@/models/Topic";
import {authenticateUser} from "@/utils/auth";
import {connectDB} from "@/utils/db";
import {generatePresignedUrl} from "@/utils/s3";
import {ITopic} from "@/types";

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

    const updateImageUrls = async (topics: ITopic[]) => {
      for (const topic of topics) {
        for (const block of topic.contentBlocks) {
          if (block.type === "image") {
            const presignedUrl = await generatePresignedUrl(`${topic.topicId.replaceAll("-", "/")}/${block.value}`);
            block.value = presignedUrl;
            console.log("Updated image URL:", block.value);
          }
        }
      }
    };

    if (id) {
      const topic = await Topic.findOne({topicId: id});
      if (!topic) {
        return NextResponse.json({error: "Topic not found or access denied"}, {status: 404});
      }

      await updateImageUrls([topic]);
      return NextResponse.json(topic, {status: 200});
    }

    if (sectionId) {
      const topics = await Topic.find({sectionId});
      await updateImageUrls(topics);
      return NextResponse.json(topics, {status: 200});
    }

    return NextResponse.json({error: "Bad request: No query parameters provided"}, {status: 400});
  } catch (error) {
    console.error("Error in GET /api/topics:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
