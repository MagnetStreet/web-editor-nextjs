import DocumentInformation from '@/types/DesignStudioItem';

export default interface DocumentInfoAndViewResponse {
  documentId: string;
  sessionId: string;
  templateId: string;
  documentInfo?: DocumentInformation;
}
