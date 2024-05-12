import { pocketbase, userRune } from '$lib/pocketbase/index.svelte';

function getChatWithUsers(currentUser: number) {
	try {
		return pocketbase.collection('chats').getFullList(200, {
			sort: 'created',
			expand: 'users',
			filter: `users ~ '${userRune.authStore.id}'`
		});
	} catch (e) {
		console.error(e);
		return [];
	}
}

function getChatWithUsers() {
	try {
		return pocketbase.collection('chats').getFullList(200, {
			sort: 'created',
			expand: 'users',
			filter: `users ~ '${userRune.authStore.id}'`
		});
	} catch (e) {
		
		// a function we created in the previous post
		console.error(e);
		return [];
	}
}
