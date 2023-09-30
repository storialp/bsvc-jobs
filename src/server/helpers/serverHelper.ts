import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import { createInnerTRPCContext } from "~/server/api/trpc";

export function generateSSGHelper() {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ userId: null, revalidateSSG: null }),
    transformer: superjson, // optional - adds superjson serialization
  });
}
