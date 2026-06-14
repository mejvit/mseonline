import type { StreamLink } from "./stream-link"

export type StreamDescription = {
    streamLinks: StreamLink[];
    note?: string;
}
