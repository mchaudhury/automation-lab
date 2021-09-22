// In the terminal, go into the project folder 'movieList'--> type 'npm i' AND 'npm i chromedriver@latest'
import { afterAll, beforeAll, expect, test } from "@jest/globals";
import { Builder, Capabilities, By } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://127.0.0.1:5500/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

test("Adding a movie to the page", async () => {
  let input = await driver.findElement(By.name("input"));
  await input.sendKeys("Superman\n");

  let button = await driver.findElement(By.xpath("//button"));
  await button.click();

  await driver.sleep(1000);
});

test("Crossing off movie", async () => {
  let movie = await driver.findElement(By.xpath("//span"));
  await movie.click();
  await driver.sleep(1000);
  await movie.click();
  await driver.sleep(1000);
});

test("Check is deleted movie message is correct", async () => {
  let aside = await driver.findElement(By.xpath("//aside"));
  let asideText = await aside.getText();
  let movie = await driver.findElement(By.xpath("//span"));
  let movieText = await movie.getText();

  expect(asideText).toBe(`${movieText} watched!`);
});

test("Deleting a movie from the page", async () => {
  let deleteButton = await driver.findElement(By.xpath("//button[text()='x']"));
  await deleteButton.click();
  await driver.sleep(1000);
});
