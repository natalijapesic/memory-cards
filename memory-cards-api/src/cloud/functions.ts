
Parse.Cloud.define("hello", (req) => {
  return "Hi";
});

Parse.Cloud.define("asyncFunction", async (req) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "Hi async";
});

Parse.Cloud.beforeSave("Test", () => {
  throw new Parse.Error(9001, "Saving test objects is not available.");
});


