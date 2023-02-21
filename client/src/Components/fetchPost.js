const fetchPost = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://localhost:3001/posts/byId/${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }
  return apiRes.json();
};

export default fetchPost;
