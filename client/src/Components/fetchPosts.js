async function fecthPosts() {
  const apiRes = await fetch(`http://localhost:3001/posts`);

  if (!apiRes.ok) {
    throw new Error(`/api fetch not ok`);
  }
  return apiRes.json();
}

export default fecthPosts;
