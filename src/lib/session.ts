import { auth } from "./auth";
import { db } from "./db";

export async function getCurrentBusiness() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      business: {
        include: {
          services: { where: { active: true }, orderBy: { name: "asc" } },
          availability: { orderBy: { dayOfWeek: "asc" } },
        },
      },
    },
  });

  return user?.business ?? null;
}
