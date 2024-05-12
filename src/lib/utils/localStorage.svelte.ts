import { browser } from '$app/environment';
import { deserialize } from '$app/forms';

export class LocalStorage<T>{
	value = $state<T>() as T;
	key = ''
	constructor(key:string, value:T){
		this.value = value
		this.key = key
		if(browser){
			const item = localStorage.getItem(key)
			if (item) this.value = this.deserialize(item)
		}
		$effect(()=>{
			localStorage.setItem(this.key, this.serialize(this.value))
		})
	}
	serialize(value:T):string{
		return JSON.stringify(value)
	}
	deserialize(value:string): T{
		return JSON.parse(value)
	}
}