import { createFileRoute, redirect } from "@tanstack/react-router";
import { P } from "@/lib/paths";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: P.home });
  },
});
