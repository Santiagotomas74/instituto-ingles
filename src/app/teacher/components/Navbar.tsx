import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const cookieStore = await cookies();

  return (
    <NavbarClient
      userId={cookieStore.get("user_id")?.value ?? ""}
      teacherName={cookieStore.get("teacher_name")?.value ?? ""}
      teacherLastname={cookieStore.get("teacher_lastname")?.value ?? ""}
    />
  );
}
