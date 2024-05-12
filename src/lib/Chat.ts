import { pocketbase, userRune } from '$lib/pocketbase/index.svelte';

class Chat {
	allChats: any = [];
	allMessages: any = [];
	
	async getChatWithUsers() {
		try {
			return await pocketbase.collection('chats').getFullList(200, {
				sort: 'created',
				expand: 'users',
				relation: `users ~ '${userRune.authStore.id}'`
			});
		} catch (e) {
			console.log(e);
			return [];
		}
	}
	
	async createChatWithUser(username: string) {
		try {
			const otherUser = await pocketbase.collection('users').getFirstListItem(`username = '${username}'`);
			return await pocketbase.collection('chats').create({
				relation: [userRune.authStore.id, otherUser.id]
			});
		} catch (e) {
			console.log(e);
		}
	}
	
	async getAllMessages(chatId: string) {
		try {
			return await pocketbase.collection('messages').getFullList(200, {
				sort: 'created',
				filter: `chat_id = '${chatId}'`
			});
		} catch (e) {
			console.log(e);
			return [];
		}
	}
	
	async sendMessage(chatId: string) {
		try {
			await pocketbase.collection('messages').create({
				chat_id: chatId,
				author_id: userRune.authStore.id,
				content: 'hello world'
			});
		} catch (e) {
			console.log(e);
		}
	}
}

// Usage:
export const chat = new Chat();
