import database from "infra/database.js";


test("Get to /api/v1/migrations return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  console.log(process.env.POSTGRES_PORT);
});
