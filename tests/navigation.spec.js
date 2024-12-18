const { test, expect } = require("@playwright/test");

test.describe("Sign-In Page Tests", () => {
	test("should navigate to the sign-in page and allow user sign-in", async ({
		page,
	}) => {
		// Navigate to the main page
		await page.goto("http://localhost:3000/");

		// Click the "Sign In" link to go to the sign-in page
		await page.locator('button[name="SideBarMenuUser"]').click();
		await page.click("text=Log in");

		// Verify the URL to ensure we are on the sign-in page
		await expect(page).toHaveURL("http://localhost:3000/user/signin");

		// Fill in the email input field
		await page.fill('input[name="email"]', "nodixas608@bflcafe.com");

		// Fill in the password input field
		await page.fill('input[name="password"]', "bflcafe608");

		// Click the "Sign in" button
		await page.click('button[type="submit"]');

		// Verify successful redirection after signing in
		// Assuming a successful login redirects to '/' or another route
		// Replace with the actual route for post-login redirection in your app
		await expect(page).toHaveURL("http://localhost:3000/");
	});

	test("should show an error message for invalid credentials", async ({
		page,
	}) => {
		// Navigate to the sign-in page directly
		await page.goto("http://localhost:3000/user/signin");

		// Fill in the email input field with an invalid email
		await page.fill('input[name="email"]', "nonexistent@example.com");

		// Fill in the password input field with an invalid password
		await page.fill('input[name="password"]', "wrongpassword");

		// Click the "Sign in" button
		await page.click('button[type="submit"]');

		// Verify an error message is displayed
		await expect(page.locator(".text-red-600")).toContainText(
			"No account found with this email address."
		);
	});

	test("should redirect unauthenticated users to the login page", async ({
		page,
	}) => {
		// Step 1: Navigate to a protected page
		await page.goto("http://localhost:3000/user/profile");

		// Step 2: Verify that the user is redirected to the login page
		await expect(page).toHaveURL(
			"http://localhost:3000/user/signin?returnUrl=/user/profile"
		);
	});
});
