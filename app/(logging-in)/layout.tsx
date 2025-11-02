import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // No plan check here!
  return <>{children}</>;
}
