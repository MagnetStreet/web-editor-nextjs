import DocumentInformation from '@/types/DesignStudioItem';

export default interface SessionData {
  documentId: string;
  sessionId: string;
  templateId: string;
  viewBlob?: Blob;
  documentInfo?: DocumentInformation;
}
