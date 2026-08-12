import { useQuery } from "@tanstack/react-query";

const UseGetTransation = ({id}: {id: string}) => {

  const {
    isPending,
    error,
    isError,
    data: fetchedTransaction,
  } = useQuery({
    queryKey: ["fetchedTransactions",id],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/card/getcard/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, fetchedTransaction };
};

export default UseGetTransation;
