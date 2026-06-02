import { env } from "./env";

export const urls = {
  ui: {
    login: `${env.baseUiUrl}/`,
    inventory: `${env.baseUiUrl}/inventory.html`
  },
  api: {
    users: `${env.baseApiUrl}/users`,
    posts: `${env.baseApiUrl}/posts`,
    comments: `${env.baseApiUrl}/comments`
  },
  monitoring: {
    health: `${env.baseApiUrl}${env.apiHealthEndpoint}`,
    status: `${env.baseApiUrl}${env.monitoringStatusEndpoint}`
  }
};
