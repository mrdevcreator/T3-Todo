import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const ProtectedRoute = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    React.useEffect(() => {
      if (status === "loading") {
        return;
      }

      if (!session) {
        //router.replace("/login");
        window.location.href = "/";
      }
    }, [router, session, status]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectedRoute;
