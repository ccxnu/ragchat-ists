export interface ChatMessage
{
    role: "user" | "assistant";
    content: string;
}

export abstract class IChatModel
{
    abstract chat(texts: ChatMessage[]): Promise<string>;
}
