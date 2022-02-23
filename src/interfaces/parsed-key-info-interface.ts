export interface KeyInfo {
  apiKey: string;
  scope: string;
  apiKeyName: string;
  apiKeyMemo: string;
  createdAt: {
    seconds: number;
    nanos: number;
  },
  status: number;
}

export interface ParsedKeyInfo {
  data: KeyInfo;
}
