import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <h2>Home Page</h2>
      <Link href="/signup">
        <a>signup page</a>
      </Link>
      <br />
      <Link href="/signin">
        <a>signin page</a>
      </Link>
    </Layout>
  );
};
export default Index;
