export const jsonbinConfig = {
  url: 'https://api.jsonbin.io/v3/b/66f14819e41b4d34e4357765',
  masterKey: '$2b$10$kYQym0oNS90VerYUJSrDFeExy4xkpxBVcsXF/Gd4xtgwGbxHa/tr6',
  accessKey: '$2b$10$U60gGuGLpLxxTLNWvenzTueQcqbPHbAv.fQH0/.qNMkWb1idDjrC6'
};

export const getJsonbinHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Master-Key': jsonbinConfig.masterKey,
  'X-Access-Key': jsonbinConfig.accessKey
});