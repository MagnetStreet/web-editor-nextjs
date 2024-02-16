import DocumentInformation from '@/types/DocumentInformation';

export default interface SessionData {
  viewBlob?: Blob;
  documentInfo?: DocumentInformation;
}
