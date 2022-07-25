let launchDarklyClient;

async function initialize(user) {
  if (!user) {
    user = {
      key: self.crypto.randomUUID(),
    };
  }
  const client = LDClient.initialize("62d707f7ec8ffa10f6e7dafc", user);
  await client.waitForInitialization();
  return client;
}

async function getClient() {
  if (launchDarklyClient) return launchDarklyClient;
  return (launchDarklyClient = await initialize());
}

async function getFlagValue(key, fnChangeListener) {
  const client = await getClient();
  let flagValue;

  flagValue = await client.variation(key, false);

  if (fnChangeListener) {
    client.on("change:" + key, fnChangeListener);
  }
  return flagValue;
}
