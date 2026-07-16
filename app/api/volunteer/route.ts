import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  city: z.string().max(100).optional(),
  areas_of_interest: z.array(z.string()).min(1),
  availability: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("volunteer_applications").insert(parsed.data);

  if (error) {
    return NextResponse.json({ error: "Could not submit application. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
