import { useEffect } from "react";
import { useRouter } from "next/router";

// Redirect to the quotes page
const WorkQuotes = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/quotes");
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default WorkQuotes;
