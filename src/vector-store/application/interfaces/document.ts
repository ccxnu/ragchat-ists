export interface DocumentDB
{
  content: string;
  metadata: Record<string, any>;
}

export interface VectorDocument
{
  content: string;
  metadata: Record<string, any>;
  vector: string;
}
