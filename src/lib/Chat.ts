import { pocketbase, userRune } from '$lib/pocketbase/index.svelte';
import { LocalStorage } from '$lib/utils/localStorage.svelte';
import type { RecordModel } from 'pocketbase';

class Chat {
	allChats: any = [];
	allMessages: any = [];

	async getChatWithUsers() {
		try {

			//todo:get last message etc
			const chats = await pocketbase.collection('chats').getFullList(200, {
				sort: 'created',
				expand: `relation`,

			});
			const topThree = chats.slice(0, 3);
			const lastMessagse = await Promise.all(topThree.map(async (chat) => {
				const message = await pocketbase.collection('messages').getFirstListItem(`chat_id = '${chat.id}'`,{
					sort: 'created',
				});
				
				return message;
			}));

			
			const typedChats: {
				name: string,
				avatar: string,
				lastMessage: string|undefined,
				messageTimestamp: string|undefined
			}[] = [];
			
			for (let i = 0; i < chats.length; i++) {
				const chat = chats[i];
				const relation = chat.expand?.relation as any[];
				for (let j = 0; j < relation.length; j++) {
					const user = relation[j];
					if (user.id !== userRune.authStore.id) {
						typedChats.push({
							name: user.username,
							avatar: user.avatar,
							lastMessage: lastMessagse[i].content,
							messageTimestamp: lastMessagse[i].created
						});
					}
				}

			}

			return typedChats;

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
