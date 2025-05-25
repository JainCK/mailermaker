export interface NewsletterContent {
  title: string;
  content: string;
  editorMode: "markdown" | "richtext";
  primaryColor: string;
  fontFamily: string;
}

export interface NewsletterState {
  newsletter: NewsletterContent;
}

export interface CustomizationOptions {
  primaryColor: string;
  fontFamily: string;
}
