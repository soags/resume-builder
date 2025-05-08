import { auth } from "@/auth";
import { createResume } from "@/features/resumes/models/resumes";
import { NextResponse } from "next/server";

export const POST = auth(async (req) => {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { user } = req.auth;

  const resume = await createResume(user.id!);

  return NextResponse.json(resume);
});
