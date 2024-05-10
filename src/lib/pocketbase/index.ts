import { currentUser } from "$lib/stores/user.svelte";
import PocketBase from "pocketbase"


export const pocketbase = new PocketBase("https://pocketbase.wasimhub.dev");
currentUser.authStore = pocketbase.authStore

class AuthManager {

    pocketbase: PocketBase
    constructor(pocketbase: PocketBase) {
        this.pocketbase = pocketbase;
    }

    public async register(username: string, password: string, confirmPassword: string) {

        const response = await pocketbase.collection('users').create({
            username,
            password,
            confirmPassword
        })
        AuthManager.refreshAuthStore();
        return response
    }


    public async login(username: string, password: string) {
        const response = await pocketbase.collection('users').authWithPassword(username, password)
        console.log(response);
        currentUser.user = response;
        AuthManager.refreshAuthStore();
        return response;

    }

    public async loginWithProvider(provider: string) {
        const response = await pocketbase.collection('users').authWithOAuth2({ provider })
        currentUser.user = response;
        AuthManager.refreshAuthStore();
        return response;
    }
    public static refreshAuthStore(){
        currentUser.authStore = pocketbase.authStore
    }
    public logout(){
        console.log("logged out");
        currentUser.authStore?.clear();
        pocketbase.authStore.clear();
        AuthManager.refreshAuthStore();
    }

}
AuthManager.refreshAuthStore();
export const authManager = new AuthManager(pocketbase);