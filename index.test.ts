import {findServer, TInputUrl} from './index';
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
    await findServer(data).catch((e: string) => expect(e).toEqual("No available server"))
  })
})

