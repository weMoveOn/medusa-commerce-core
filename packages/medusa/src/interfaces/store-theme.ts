export interface IAdminStoreThemeCreate {
  uploads: Upload[];
}

interface Upload {
  url: string;
  key: string;
}
