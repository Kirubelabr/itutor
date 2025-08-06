import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Send,
  MessageSquare,
  ArrowLeft,
  Pin,
  PinOff,
  Bot,
  User,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  sender: "user" | "contact" | "buze";
  message: string;
  timestamp: Date;
  read?: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: "student" | "tutor";
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
}

interface MessagesPageProps {
  userRole?: "student" | "tutor";
  contacts?: Contact[];
}

export default function MessagesPage({
  userRole = "student",
  contacts = [
    {
      id: "buze",
      name: "Buze AI Assistant",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=buze",
      role: "tutor",
      lastMessage: "How can I help you study today?",
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 0,
      online: true,
    },
    {
      id: "1",
      name: userRole === "student" ? "Dr. Sarah Miller" : "Alex Chen",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole === "student" ? "sarah" : "alex"}`,
      role: userRole === "student" ? "tutor" : "student",
      lastMessage:
        userRole === "student"
          ? "Great progress on calculus!"
          : "Can we reschedule tomorrow's session?",
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 2,
      online: true,
    },
    {
      id: "2",
      name: userRole === "student" ? "Prof. Michael Chen" : "Jamie Smith",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole === "student" ? "michael" : "jamie"}`,
      role: userRole === "student" ? "tutor" : "student",
      lastMessage:
        userRole === "student"
          ? "Don't forget about the chemistry quiz"
          : "Thank you for the extra practice problems!",
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 0,
      online: false,
    },
    {
      id: "3",
      name: userRole === "student" ? "Dr. Emily Rodriguez" : "Taylor Wong",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole === "student" ? "emily" : "taylor"}`,
      role: userRole === "student" ? "tutor" : "student",
      lastMessage:
        userRole === "student"
          ? "History essay feedback attached"
          : "I'm struggling with the physics concepts",
      lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 1,
      online: true,
    },
  ],
}: MessagesPageProps) {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    contacts[0],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [buzePinned, setBuzePinned] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "buze",
      message:
        "Hi! I'm Buze, your AI learning assistant. How can I help you study today?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      sender: "user",
      message: "I need help understanding calculus derivatives",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      sender: "buze",
      message:
        "I'd be happy to help you with derivatives! Let's start with the basic definition. A derivative represents the rate of change of a function at any given point. Would you like me to explain this with a specific example?",
      timestamp: new Date(Date.now() - 180000),
    },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "user",
        message: newMessage,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, userMessage]);
      setNewMessage("");

      // Simulate response for Buze
      if (selectedContact?.id === "buze") {
        setTimeout(() => {
          const buzeResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: "buze",
            message:
              "That's a great question! Let me help you with that. Based on your learning progress, I recommend focusing on practice problems and reviewing the fundamentals.",
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, buzeResponse]);
        }, 1000);
      }
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Separate Buze from other contacts and sort
  const buzeContact = filteredContacts.find((c) => c.id === "buze");
  const otherContacts = filteredContacts
    .filter((c) => c.id !== "buze")
    .sort((a, b) => {
      // Sort by unread messages first, then by last message time
      if (a.unreadCount !== b.unreadCount) {
        return b.unreadCount - a.unreadCount;
      }
      return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
    });

  const sortedContacts =
    buzePinned && buzeContact
      ? [buzeContact, ...otherContacts]
      : [...otherContacts, ...(buzeContact ? [buzeContact] : [])];

  return (
    <div className="flex h-screen bg-background">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/${userRole}/dashboard`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Messages</h1>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {sortedContacts.map((contact) => (
            <div key={contact.id}>
              <div
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedContact?.id === contact.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>
                        {contact.id === "buze" ? (
                          <Bot className="h-6 w-6" />
                        ) : (
                          contact.name.substring(0, 2)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium truncate">{contact.name}</p>
                        {contact.id === "buze" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setBuzePinned(!buzePinned);
                            }}
                          >
                            {buzePinned ? (
                              <Pin className="h-3 w-3" />
                            ) : (
                              <PinOff className="h-3 w-3" />
                            )}
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {contact.unreadCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-1.5 py-0.5"
                          >
                            {contact.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {contact.lastMessageTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
              {contact.id === "buze" && buzePinned && (
                <Separator className="mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback>
                      {selectedContact.id === "buze" ? (
                        <Bot className="h-5 w-5" />
                      ) : (
                        selectedContact.name.substring(0, 2)
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedContact.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.id === "buze"
                        ? "AI Learning Assistant"
                        : selectedContact.online
                          ? "Online"
                          : "Last seen recently"}
                    </p>
                  </div>
                </div>

                {selectedContact.id !== "buze" && (
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.sender === "buze"
                          ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                          : "bg-muted"
                    }`}
                  >
                    {message.sender === "buze" && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot className="h-3 w-3" />
                        <span className="text-xs font-medium">Buze AI</span>
                      </div>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {selectedContact.id === "buze" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage("Help me with my homework")}
                  >
                    Help with homework
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage("Create a study plan")}
                  >
                    Create study plan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage("Explain a concept")}
                  >
                    Explain concept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage("Generate practice questions")}
                  >
                    Practice questions
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Select a conversation
              </h3>
              <p className="text-muted-foreground">
                Choose a contact to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
