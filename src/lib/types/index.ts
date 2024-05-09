export interface NewMessage {
	id: number;
	guest: boolean;
	avatar: string;
	name: string;
	timestamp: Date;
	message: string;
	color: string;
}
