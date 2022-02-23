export interface ParsedCertInfo {
  cn: string;
  is_valid: boolean;
  not_after: number;
  serial: string;
}

export interface CertInfo extends ParsedCertInfo {};
