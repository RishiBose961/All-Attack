import { useQuery } from "@tanstack/react-query";

const UseGetHook = ({id}: {id: string}) => {

  const {
    isPending,
    error,
    isError,
    data: fetchedDataCard,
  } = useQuery({
    queryKey: ["fetchedDataCards",id],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/card/getcard?id=${id}`, {
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

  return { isPending, fetchedDataCard };
};

export default UseGetHook;
