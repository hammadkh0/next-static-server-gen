export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log("server side code");
  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
