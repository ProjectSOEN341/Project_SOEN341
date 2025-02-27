import { Message } from "./message";

export interface Conversation{
    id:number;
    user1:string;
    user2:string;
    role:string;
    messages:Message[];
}