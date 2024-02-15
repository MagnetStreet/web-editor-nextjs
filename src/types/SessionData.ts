import DocumentInformation from '@/types/DocumentInformation';

export default interface SessionData {
  viewURL: string;
  getDocumentResponse: DocumentInformation | null;
}
