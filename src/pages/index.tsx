import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = function HomePage() {
  const { data: session } = useSession();

  return (
      <main>
        {session ? (
          <>
            Signed in as <br />
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <button type="button" onClick={() => signOut()}>
              Sign out
            </button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button type="button" onClick={() => signIn("google")}>
              Sign in
            </button>
          </>
        )}
      </main>
  );
};

export default Home;
