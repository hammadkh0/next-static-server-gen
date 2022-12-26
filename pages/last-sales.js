import { useEffect, useState } from "react";
import useSWR from "swr";

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-35910-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales }, revalidate: 20 };
}

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(true);

  //   const { data, error } = useSWR(
  //     "https://nextjs-course-35910-default-rtdb.firebaseio.com/sales.json"
  //   );

  //   useEffect(() => {
  //     if (data) {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformedSales);
  //     }
  //   }, [data]);

  useEffect(() => {
    fetch("https://nextjs-course-35910-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  /* 
    Next will render this in the HTML source because it will pre-render by default and not wait for useEffect to finish and get the data. The useEffect will send data through hydration but that will not change the source code of the pre-rendered HTML.
  */

  if (!sales && isLoading) {
    return <p>LODAING....</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}
