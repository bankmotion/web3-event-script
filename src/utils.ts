export const fetchPaginatedData = async (
  contract: any,
  method: string,
  address: string,
  batchSize = 10
) => {
  let results: any[] = [];
  let start = 0;
  let hasMore = true;

  while (hasMore) {
    try {
      const data = await contract.methods[method](
        address,
        start,
        batchSize
      ).call();
      console.log({data})
      if (data.length === 0) {
        hasMore = false;
      } else {
        results = results.concat(data);
        start += batchSize;
      }
    } catch (err) {
      console.log(`ERROR fetching paginated data: ${err}`);
      hasMore = false;
    }
  }
  return results;
};
