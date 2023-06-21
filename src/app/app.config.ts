import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface AppConfig {
  api_base: string;
  api_base_User: string;
  api_parent_link: string;
}
export const BaseAppConfig: AppConfig = {
  // api_base: 'http://www.angalan.com/public/api/',
  // api_base_User: 'http://www.angalan.com/public/api/',
  // api_parent_link: 'http://www.angalan.com'

  //new test server
  // api_base: "https://kohkie.rvnsolutions.app/api/",
  // api_base_User: "https://kohkie.rvnsolutions.app/api/",
  // api_parent_link: "https://kohkie.rvnsolutions.app",

  api_base: "http://15.235.150.176/api/",
  api_base_User: "http://15.235.150.176/api/",
  api_parent_link: "http://15.235.150.176",

  // api_base: 'https://order.solanedev.app/public/api/',
  // api_base_User: 'https://order.solanedev.app/public/api/',
  // api_parent_link: 'https://order.solanedev.app'

  // api_base: 'https://www.deliserv.app/public/api/',
  // api_base_User: 'https://www.deliserv.app/public/api/',
  // api_parent_link: 'https://www.deliserv.app'
};
