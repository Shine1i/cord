import PocketBase from 'pocketbase';
import type {
	BaseAuthStore,
	RecordAuthResponse,
	RecordModel
} from 'pocketbase';
import { LocalStorage } from '$lib/utils/localStorage.svelte';
export const pocketbase = new PocketBase('https://pocketbase.wasimhub.dev');

class UserSession {
	user = $state<RecordAuthResponse<RecordModel>>();
	authStore = $state<any>();
	
}

export const userRune = new UserSession();

export class UserManager {
	
	
	public async register(username: string, password: string, confirmPassword: string) {
		const avatar = `https://api.dicebear.com/8.x/initials/svg?seed=${username}&backgroundColor=ff6666`;
		const response = await pocketbase.collection('users').create({
			username,
			password,
			passwordConfirm: confirmPassword,
			avatar
		});
		
		return response;
	}
	
	
	public async login(username: string, password: string) {
		const response = await pocketbase.collection('users').authWithPassword(username, password);
		return response;
		
	}
	
	public async loginWithProvider(provider: string) {
		const response = await pocketbase.collection('users').authWithOAuth2({ provider });
		return response;
	}
	
	public logout() {
		pocketbase.authStore.clear();
	}
	
	
}

export const userManager = new UserManager();
