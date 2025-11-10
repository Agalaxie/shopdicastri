const { Modules } = require("@medusajs/framework/utils");

async function createAdminUser() {
  const { getContainer } = require("@medusajs/framework/utils");

  const container = getContainer();
  const userModuleService = container.resolve(Modules.USER);

  try {
    const user = await userModuleService.createUsers({
      email: "admin@example.com",
      first_name: "Admin",
      last_name: "User",
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@example.com");
    console.log("User ID:", user.id);
    console.log("\nNow you can sign in at: http://localhost:9000/app/login");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
}

createAdminUser();
