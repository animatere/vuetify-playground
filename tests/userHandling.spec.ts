import { test, expect } from "@playwright/test";

test.describe("User Login/Signup/Logout", () => {
  test("successful login redirects to /home page", async ({ page }) => {
    // öffne login
    await page.goto("/login");

    // Login Prozess
    await page.fill('input[type="text"]', "Alex");
    await page.fill('input[type="email"]', "alex.wolf@trizelos.com");
    await page.fill('input[type="password"]', "Test12345");
    await page.click('button:has-text("Login")');

    // login erfolgreich => redirect zu /home
    await expect(page).toHaveURL("/home");
  });

  test("failed login results in staying on /login Page", async ({ page }) => {
    // öffne login
    await page.goto("/login");

    // Form mit falschen Werten befüllen
    await page.fill('input[type="text"]', "wrongUser");
    await page.fill('input[type="email"]', "wrong.mail@trizelos.com");
    await page.fill('input[type="password"]', "TestWrong");

    // auf Login klicken
    await page.click('button:has-text("Login")');

    // Kein redirect zu /home => Login fehlgeschlagen
    await expect(page).toHaveURL("/login");
  });

  test("signup link navigates to signup page", async ({ page }) => {
    // öffne login
    await page.goto("/home");

    // Signup Prozes
    await page.click('a:has-text("Signup")');
    await expect(page).toHaveURL("/signup");
    await page.fill('input[type="text"]', "newUser");
    await page.fill('input[type="email"]', "new.User@trizelos.com");
    await page.fill('input[type="password"]', "Test12345");
    await page.click('button:has-text("Sign Up")');

  });

  test("successful logout redirects to login", async ({ page }) => {
    // öffne login
    await page.goto("/login");

    // Login Prozess
    await page.fill('input[type="text"]', "Alex");
    await page.fill('input[type="email"]', "alex.wolf@trizelos.com");
    await page.fill('input[type="password"]', "Test12345");
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL("/home");

    // Logout Prozess
    await page.click(".user-dropdown .toggleUserMenu");
    await page.waitForSelector(".user-dropdown-menu");
    await page.click('.user-dropdown-menu .dropdown-item:has-text("Logout")');
    await page.waitForSelector('button:has-text("Login")');

    // Überprüfe die Weiterleitung zur Login-Seite
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
});
