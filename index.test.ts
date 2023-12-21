import {findServer, TInputUrl} from "./index";
import {describe, expect, it} from '@jest/globals';
import fetch from "jest-fetch-mock";

describe("Find lowest priority server", () => {
  beforeEach(() => {
    fetch.resetMocks();
  })

  it("Lowest priority server found", async () => {
    fetch.mockResponse(req => {
      const urls = ["https://gitlab.com", "http://app.scnt.me/"]
      return urls.includes(req.url) ? Promise.resolve({status: 200}) : Promise.reject();
    })
    const data: TInputUrl[] = [
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
    ];
    const resp = await findServer(data);
    expect(resp).toStrictEqual({url: "http://app.scnt.me", priority: 3});
  });

  it("No server found", async () => {
    const data: TInputUrl[] = [
      {
        "url": "htt://about.gitlab.com",
        "priority": 3
      },
      {
        "url": "https://gitlab.com",
        "priority": 4
      },
    ];
    fetch.mockResponse(() => Promise.reject());
    await findServer(data).catch(e => expect(e).toEqual("No available server"))
  })
})

// describe('testing api', () => {
//   beforeEach(() => {
//     fetch.resetMocks()
//   })
//
//   it('calls google and returns data to me', () => {
//     fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
//
//     //assert on the response
//     // @ts-ignore
//     APIRequest('google').then((res: string) => {
//       // @ts-ignore
//       expect(res.data).toEqual('12345')
//     })
//     console.debug(fetch.mock.calls.length)
//     //assert on the times called and arguments given to fetch
//     expect(fetch.mock.calls.length).toEqual(1)
//     expect(fetch.mock.calls[0][0]).toEqual('https://google.com')
//   })
// })
