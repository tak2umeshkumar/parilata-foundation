import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  blog_id: z.string().uuid().optional(),
  story_id: z.string().uuid().optional(),
  guest_name: z.string().min(2).max(100),
  guest_email: z.string().email().optional().or(z.literal("")),
  content: z.string().min(2).max(2000),
}).refine((data) => data.blog_id || data.story_id, { message: "Missing blog_id or story_id" });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("comments").insert({
    ...parsed.data,
    guest_email: parsed.data.guest_email || null,
    is_approved: false,
  });

  if (error) {
    return NextResponse.json({ error: "Could not post comment. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
