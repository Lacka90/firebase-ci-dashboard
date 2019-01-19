module.exports = () => {
  return { code: 'module.exports = ' + JSON.stringify({
    projectId: process.env.PROJECT_ID,
    projectApiKey: process.env.PROJECT_APIKEY,
  }) };
};
