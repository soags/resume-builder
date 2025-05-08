import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/me/resumes" });
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
