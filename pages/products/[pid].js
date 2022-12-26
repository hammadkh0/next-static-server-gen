import fs from "fs/promises";
import path from "path";

export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({
    params: {
      pid: id,
    },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
// next will call getStaticPros 3 times for the 3 params provided.`

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  /* 
    -> We are not using useRouter hook to get the [pid] because that happens in the browser after the component is run, but we are in getStaticProps function that only runs in server.
    -> So to get the pid in server side we are using params from context. 
  */

  const data = await getData();
  const filteredProduct = data.products.find((product) => product.id === productId);

  if (!filteredProduct) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: filteredProduct,
    },
  };
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // we used fs/promises library to get promises for fs functions instead of callbacks
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}
