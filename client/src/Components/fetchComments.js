const fetchComments = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://localhost:3001/comments/${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }
  return apiRes.json();
};

export default fetchComments;
