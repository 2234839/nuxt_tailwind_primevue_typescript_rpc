export default defineNitroPlugin((nitroApp) => {
  console.log("[ENV] DATABASE_URL", process.env?.DATABASE_URL);
});
