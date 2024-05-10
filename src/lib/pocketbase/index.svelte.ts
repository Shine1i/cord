//import { currentUser } from "$lib/stores/user.svelte";
import PocketBase from "pocketbase"
import { getContext } from "svelte";
import type { BaseAuthStore, RecordAuthResponse, RecordModel } from "pocketbase";
export const pocketbase = new PocketBase("https://pocketbase.wasimhub.dev");

export class UserManager {
    user = $state<RecordAuthResponse<RecordModel>>();
    authStore = $state<BaseAuthStore>();
    constructor(pocketbase: PocketBase) {
        $inspect(this.authStore)
    }

    public async register(username: string, password: string, confirmPassword: string) {

        const response = await pocketbase.collection('users').create({
            username,
            password,
            confirmPassword
        })
        this.refreshAuthStore();
        return response
    }


    public async login(username: string, password: string) {
        const response = await pocketbase.collection('users').authWithPassword(username, password)
        console.log(this.user);
        this.user = response;
        this.refreshAuthStore();
        return response;

    }

    public async loginWithProvider(provider: string) {
        const response = await pocketbase.collection('users').authWithOAuth2({ provider })
        this.user = response;
        this.refreshAuthStore();
        return response;
    }
   
    public logout() {


        pocketbase.authStore.clear()

        //dont work
        this.authStore = pocketbase.authStore;
        console.log(this.authStore);
        //works
        this.authStore = JSON.parse(JSON.stringify(pocketbase.authStore));
        console.log(this.authStore);
        
    
        
    }

    public refreshAuthStore() {
        this.authStore = pocketbase.authStore
    }
}
export const userManager = new UserManager(pocketbase);
