export type ContentfulImage = {
  title: string;
  description: string;
  file: {
    url: string;
    details: Record<string, unknown>;
    fileName: string;
    contentType: string;
    altText: string;
  };
};
