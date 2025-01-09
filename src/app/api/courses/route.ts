import {NextResponse} from "next/server";
import Course from "@/models/Course";
import {authenticateUser} from "@/utils/auth";
import {ICourse} from "@/types";

export async function GET(req: Request) {
  console.log("GET /api/courses");
  try {
    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const allowedCourseCodes = user.courses.map((course) => course.code);

    if (id) {
      const course: ICourse | null = await Course.findOne({_id: id, code: {$in: allowedCourseCodes}});
      if (!course) {
        return NextResponse.json({error: "Course not found or access denied"}, {status: 404});
      }
      return NextResponse.json(course, {status: 200});
    }

    const courses: ICourse[] = await Course.find({code: {$in: allowedCourseCodes}}); //.lean();
    return NextResponse.json(courses, {status: 200});
  } catch (error) {
    console.error("Error in GET /api/courses:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
