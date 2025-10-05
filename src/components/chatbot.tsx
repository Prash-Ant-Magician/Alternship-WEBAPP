'use client';

import { useState, useRef, useEffect, PointerEvent } from 'react';
import { CornerDownLeft, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { handleChatbotQuery } from '@/app/actions';
import type { ChatMessage } from '@/lib/definitions';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useLocale } from '@/context/locale-context';
import ChatbotLogo from './ChatbotLogo';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  const [position, setPosition] = useState({ bottom: 16, right: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, bottom: 0, right: 0 });
  const hasDraggedRef = useRef(false);

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    // Prevent default drag behavior
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      bottom: position.bottom,
      right: position.right,
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    // If moved more than a few pixels, consider it a drag
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasDraggedRef.current = true;
    }

    const newBottom = dragStartRef.current.bottom - dy;
    const newRight = dragStartRef.current.right - dx;

    setPosition({ bottom: newBottom, right: newRight });
  };

  const handlePointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);

    // If it was just a click (not a drag), open the sheet
    if (!hasDraggedRef.current) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      // A slight delay to ensure the new message is rendered before scrolling
      setTimeout(() => {
        if (scrollAreaRef.current) {
         scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    const botResponse = await handleChatbotQuery(input);
    const botMessage: ChatMessage = { role: 'bot', content: botResponse };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: 'fixed',
          bottom: `${position.bottom}px`,
          right: `${position.right}px`,
          touchAction: 'none', // Prevent default touch actions like scrolling
          filter: 'drop-shadow(0 0 1rem hsl(var(--primary) / 0.5))'
        }}
        className={cn(
            "h-24 w-24 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        aria-label="Open chatbot"
      >
        <ChatbotLogo className="h-full w-full" />
      </button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>{t.chatbot.title}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 my-4 -mx-6" ref={scrollAreaRef}>
             <div className="px-6 py-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? "justify-end" : "")}>
                  {message.role === 'bot' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("rounded-lg px-3 py-2 max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                   <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                   </Avatar>
                   <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                     <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                   </div>
                 </div>
              )}
             </div>
          </ScrollArea>
          <SheetFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatbot.placeholder}
                disabled={isLoading}
                autoComplete="off"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <CornerDownLeft className="h-4 w-4" />
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
