import { updateResumeBasics } from "@/features/resumes/models/resumes";
import { resumeSchema } from "@/features/resumes/schema/resumeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { resumeId: string } },
) {
  const { resumeId } = params;
  const body = await req.json();

  const result = resumeSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await updateResumeBasics(resumeId, result.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
