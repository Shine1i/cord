<script lang="ts">
	import { pocketbase, userRune } from '$lib/pocketbase/index.svelte';
	import { log } from 'electron-log';
	
	function getChatWithUsers() {
		try {
			return pocketbase.collection('chats').getFullList(200, {
				sort: 'created',
				expand: 'users,messages',
				relation: `users ~ '${userRune.authStore.id}'`
			});
		} catch (e) {
			
			console.log(e);
			return [];
		}
	}
	
	let allChats: any = [];
	
	async function createChatWithUser() {
		try {
			const otherUser = await pocketbase.collection('users').getFirstListItem(`username = 'users26262'`);
			
			return await pocketbase.collection('chats').create({
				relation: [userRune.authStore.id, otherUser.id]
			});
		} catch (e) {
			console.log(e);
		}
	}
	
	function getAllMessages() {
		try {
			return pocketbase.collection('messages').getFullList(200, {
				sort: 'created',
				filter: `chat_id = 'gbtxvefjzgbv07i'`
			});
		} catch (e) {
			console.log(e);
			return [];
		}
	}
	
	let chatid = 'gbtxvefjzgbv07i';
	let allMessages: any = [];
	
	async function sendMessage() {
		try {
			await pocketbase.collection('messages').create({
				chat_id: 'gbtxvefjzgbv07i',
				author_id: userRune.authStore.id,
				content: 'hello world'
			});
		} catch (e) {
			console.log(e);
		}
	}
	
	$effect(async () => {
		// 	allMessages = await getAllMessages();
		//
		// 	pocketbase.collection("messages").subscribe("*", async (e) => {
		// 		allMessages = await getAllMessages();
		// 	});
		//
		// await sendMessage()
		// const record = await pocketbase.collection('chats').getOne('gbtxvefjzgbv07i', {
		// 	expand: 'messages,users'
		// });
		// console.log(record	);
		console.log(getChatWithUsers());
	});
</script>