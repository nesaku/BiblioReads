import Error from "next/error";

export default function Custom500() {
  return (
    <div>
      <Error statusCode={500} title={"Internal Server Error"} />
    </div>
  );
}
