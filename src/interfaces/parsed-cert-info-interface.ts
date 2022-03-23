export interface ParsedCertInfo {
  cn: string;
  isValid: boolean;
  notAfter: number;
  serial: string;
}

export interface CertInfo extends ParsedCertInfo {};
