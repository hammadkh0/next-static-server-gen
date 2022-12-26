import { Inter } from "@next/font/google";
import fs from "fs/promises";
import Link from "next/link";
import path from "path";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { products } = props;
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // we used fs/promises library to get promises for fs functions instead of callbacks
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return { redirect: { destination: "/no-data-page-sth" } };
  }
  if (!data.products.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
