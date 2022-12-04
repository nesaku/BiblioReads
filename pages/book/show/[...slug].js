import ResultData from "../../../components/ResultData";
import Header from "../../../components/global-components/Header";
import Footer from "../../../components/global-components/Footer";

const Slug = ({ data }) => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
      <Header />
      {data && <ResultData scrapedData={data} />}
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
    }/api/scraperSlug`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ queryURL: context.params.slug }),
    }
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default Slug;
