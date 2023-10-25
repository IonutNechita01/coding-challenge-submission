const supertest = require("supertest");
const app = require("./app");
const { RESPONSE_STATUS } = require("./utils/constants");

describe("GET /countriesData", () => {
  it("should respond with an array of countries data", async () => {
    const countriesCode = "RO,ES,FR";
    const response = await supertest(app).get(
      `/countriesData?countriesCode=${countriesCode}`
    );

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          commonName: expect.any(String),
          officialName: expect.any(String),
          population: expect.any(Number),
          capital: expect.any(String),
          region: expect.any(String),
          flag: expect.any(String),
          continents: expect.any(Array),
        }),
      ])
    );
  });

  it("should respond with the countries data that match the countries code", async () => {
    const countriesCode = "FR,RO,ES"; // Put the country is alphabetical order
    const response = await supertest(app).get(`/countriesData?countriesCode=${countriesCode}`);
    const countriesData = response.body;
    const countriesCodeFromResponse = countriesData.map((country) => country.code);
    const countriesCodeArray = countriesCode.split(',');
    expect(countriesCodeFromResponse).toEqual(countriesCodeArray);
  });
  
  it("should respond with BAD_REQUEST message and status code 400", async () => {
    const response = await supertest(app).get("/countriesData");
    console.log(response.text);
    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual(RESPONSE_STATUS.badRequest);
  });
});

describe("GET /countriesNameAndCode", () => {
  it("should respond with an array of countries name and code", async () => {
    const response = await supertest(app).get("/countriesNameAndCode");

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          commonName: expect.any(String),
          code: expect.any(String),
        }),
      ])
    );
  });
});
