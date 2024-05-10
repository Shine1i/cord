import type { BaseAuthStore, RecordAuthResponse, RecordModel } from "pocketbase";

class CurrentUser {
    user = $state<RecordAuthResponse<RecordModel>>();
    authStore = $state<BaseAuthStore>() ;
  }
  export const currentUser = new CurrentUser();