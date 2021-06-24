export interface LogEntry {
    type: string | null;
    string: string | null;
    time: number;
    steamid: string | null;
    itemid: string | null;
    charid: string | null;
}