export interface KeyInfo {
  apiKey: string;
  apiKeyName: string;
  apiKeyMemo: string;
  createdAt: {
    seconds: number;
    nanos: number;
  },
  scope: string;
  status: number;
}

export interface ParsedKeyInfo {
  data: KeyInfo;
}
