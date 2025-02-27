import { ChannelMessage } from "./channelMessage";

export interface Channel {
    id:number;
    name: String;
    channelMessages:ChannelMessage[];
  }