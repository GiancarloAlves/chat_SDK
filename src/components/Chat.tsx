'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: ' /api/chat',
    })

    return (
        <Card className="w-[500px] bg-neutral-50">
            <CardHeader>
                <CardTitle>Chat AI</CardTitle>
                <CardDescription>Using Vercel SDK to create a chat bot.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px] w-full space-y-6 pr-6">
                    {messages.map(message => {
                        return (
                            <div key={message.id} className="flex gap-4 text-sm pt-3 pb-3">
                                {message.role === "user"
                                    ? (
                                        <Avatar>
                                            <AvatarImage src="https://github.com/giancarlopagliarini.png" />
                                            <AvatarFallback>GC</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <Avatar>
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                    )}
                                <div className="mb-6">
                                    {message.role === 'user' && <span className="font-bold">You</span>}
                                    {message.role === 'assistant' && <span className="font-bold">Chat</span>}
                                    <p className="leading-relaxed text-justify">
                                        {message.content}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                    <Input value={input} onChange={handleInputChange} placeholder="How can I help you?" />
                    <Button type="submit">Send</Button>
                </form>
            </CardFooter>
        </Card>
    )
}