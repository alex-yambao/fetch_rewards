require("dotenv").config();
const axios = require("axios");
const PORT = 3000 || process.env.PORT;
const SERVER_ADDRESS = `http://localhost:${PORT}` || process.env.SERVER_ADDRESS;
const API_URL = process.env.API_URL || SERVER_ADDRESS;

describe("API", () => {
  it("responds to a request at /api/health with a message specifying it is healthy", async () => {
    const res = await axios.get(`${API_URL}/api/health`);
    expect(typeof res.data.message).toEqual("string");
  });
});

describe("rewards/add", () => {
  let reward;
  let newReward = { payer: "NESTLE", points: 500 };
  beforeAll(async () => {
    const req = await axios.post(`${API_URL}/api/rewards/add`, newReward);
    reward = req.data;
  });
  it("returns an object", async () => {
    expect(typeof reward).toBe("object");
  });
  it("object has payer, points, timestamp", async () => {
    expect(reward.payer).toBeTruthy();
    expect(reward.points).toBeTruthy();
  });
  it("throws error if points value is negative", async () => {
    let errResp;
    let badReq = { payer: "NESTLE", points: -500 };
    let req;
    try {
      req = await axios.post(`${API_URL}/api/rewards/add`, badReq);
    } catch (error) {
      errResp = error.response;
    }
    expect(errResp.status).toBe(400);
  });
  it("throws error if there are missing fields", async () => {
    let errResp;
    let badReq = {};
    let req;
    try {
      req = await axios.post(`${API_URL}/api/rewards/add`, badReq);
    } catch (error) {
      errResp = error.response;
    }
    expect(errResp.status).toBe(400);
  });
});

describe("rewards/spend", () => {
  let transaction;
  let spendRequest = { points: 1050 };
  let req;
  beforeAll(async () => {
    req = await axios.patch(`${API_URL}/api/rewards/spend`, spendRequest);
    transaction = req.data;
  });
  it("returns an object", async () => {
    expect(typeof transaction).toBe("object");
  });
  it("object has payer, point deduction values", async () => {
    expect(transaction.hasOwnProperty("payer"));
    expect(transaction.hasOwnProperty("points"));
  });
  it("throws error if there is an insufficient points balance", async () => {
    let errResp;
    let spendReq = { points: 50000000 };
    let req;
    try {
      req = await axios.patch(`${API_URL}/api/rewards/spend`, spendReq);
    } catch (error) {
      errResp = error.response;
    }
    expect(errResp.status).toBe(400);
  });
  it("throws an error for invalid fields", async () => {
    let errResp;
    let spendReq = { payer: "CAMPBELLS", points: "500" };
    let req;
    try {
      req = await axios.patch(`${API_URL}/api/rewards/spend`, spendReq);
    } catch (error) {
      errResp = error.response;
    }
    expect(errResp.status).toBe(400);
  });
});

describe("rewards/balance", () => {
  let list;
  beforeAll(async () => {
    const req = await axios.get(`${API_URL}/api/rewards/balance`);
    list = req.data;
  });
  it("returns an array with objects", async () => {
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    expect(list[0].payer).toBeTruthy();
    expect(list[0].points).toBeTruthy();
  });
});
