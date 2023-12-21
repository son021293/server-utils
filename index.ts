export type TInputUrl = { url: string, priority: number };

export const findServer = async (data: TInputUrl[]) => {
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

(async () => {
  await findServer([
      {
        "url": "https://does-not-work.perfume.new",
        "priority": 1
      },
      {
        "url": "https://gitlab.com",
        "priority": 4
      },
      {
        "url": "http://app.scnt.me",
        "priority": 3
      },
      {
        "url": "https://offline.scentronix.com",
        "priority": 2
      }
    ]
  )
})()

exports.findServer = findServer



