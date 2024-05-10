import Meta from "../../components/global/Meta";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import SearchBox from "../../components/searchpage/SearchBox";

// SSR redirect /search?q={title} to /search/{title}
export async function getServerSideProps(context) {
  const { query } = context;
  if (query.q) {
    return {
      redirect: {
        destination: `/search/${query.q}`,
        permanent: true,
      },
    };
  }

  return { props: {} };
}

const Search = () => {
  return (
    <>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage min-h-full m-0 p-0">
        <Meta title={"Search"} />
        <Header />
        <div className="flex justify-center items-center align-middle">
          <div className="flex flex-col xl:flex-row justify-center items-center text-center h-[80vh] w-full">
            <SearchBox main={true} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Search;
