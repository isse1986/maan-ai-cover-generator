
export interface TextElement {
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  top: number; // percentage
  left: number; // percentage
  width: number; // percentage
}

export interface CoverData {
  title: TextElement;
  author: TextElement;
  genre: string;
  templateKey: string;
  backgroundImage: string; // base64 image
}

export interface BookCover {
  id: string;
  data: CoverData;
  createdAt: string;
}

export interface TemplateDetails {
  name: string;
  width: number; // pixels
  height: number; // pixels
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

export interface PublishingTemplates {
  [key: string]: TemplateDetails;
}
