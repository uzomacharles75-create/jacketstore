// Public submission endpoint for custom order requests.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const schema = z.object({
  company: z.string().trim().min(1).max(200),
  contact_name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(3).max(40),
  email: z.string().email().max(200).optional().or(z.literal("")),
  product_type: z.string().trim().min(1).max(120),
  quantity: z.string().trim().min(1).max(40),
  colors: z.string().max(200).optional().or(z.literal("")),
  notes: z.string().max(4000).optional().or(z.literal("")),
  file_url: z.string().url().nullable().optional(),
});

export const submitCustomOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("custom_orders").insert({
      company: data.company,
      contact_name: data.contact_name,
      phone: data.phone,
      email: data.email || null,
      product_type: data.product_type,
      quantity: data.quantity,
      colors: data.colors || null,
      notes: data.notes || null,
      file_url: data.file_url || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
