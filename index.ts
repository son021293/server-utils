type TInputUrl = { url: string, priority: number };

const findServer = async (data: TInputUrl[]) => {
  const validServer: TInputUrl[] = [];
  await Promise.all(data.map(async (item) => {
    try {
      const res = await fetch(item.url, {signal: AbortSignal.timeout(5000)});
      const statusCode = res.status;
      if (statusCode && statusCode >= 200 && statusCode <= 299) {
        validServer.push(item);
      }
    } catch (e) {
    }
  }))
  if (validServer.length === 0) return Promise.reject("No available server");
  const sortedServersLowestPriority = [...validServer].sort((a, b) => a.priority - b.priority);
  return Promise.resolve(sortedServersLowestPriority[0]);
}

export {findServer, TInputUrl}




