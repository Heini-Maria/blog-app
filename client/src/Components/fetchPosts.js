async function fecthPosts() {
  const apiRes = await fetch(`/api`);

  if (!apiRes.ok) {
    throw new Error(`/api fetch not ok`);
  }
  return apiRes.json();
}

export default fecthPosts;
