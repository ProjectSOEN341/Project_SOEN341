import { ChannelMessage } from "./channelMessage";

export interface Channel {
    id:number;
    name: string;
    channelMessages:ChannelMessage[];
  }