import {NextResponse} from "next/server";
import Section from "@/models/Section";
import {authenticateUser} from "@/utils/auth";
import {connectDB} from "@/utils/db";

export async function GET(req: Request) {
  console.log("GET /api/sections");

  try {
    await connectDB();
    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const courseCode = url.searchParams.get("courseCode");

    const allowedCourseCodes = user.courses.map((course) => course.code);

    if (id) {
      const section = await Section.findOne({_id: id, "course.code": {$in: allowedCourseCodes}}).lean();
      if (!section) {
        return NextResponse.json({error: "Section not found or access denied"}, {status: 404});
      }
      return NextResponse.json(section, {status: 200});
    }

    if (courseCode) {
      if (!allowedCourseCodes.includes(courseCode)) {
        return NextResponse.json({error: "Access denied: Not allowed to view this course"}, {status: 403});
      }

      const sections = await Section.find({"course.code": courseCode}).lean();
      return NextResponse.json(sections, {status: 200});
    }

    const sections = await Section.find({courseCode: {$in: allowedCourseCodes}}).lean();
    return NextResponse.json(sections, {status: 200});
  } catch (error) {
    console.error("Error in GET /api/sections:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
