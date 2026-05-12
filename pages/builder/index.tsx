import { useEffect } from "react";
import { useRouter } from "next/router";

export default function BuilderIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a default demo store editor
    router.push("/builder/demo-store/edit");
  }, []);

  return <div>Redirecting to editor...</div>;
}
