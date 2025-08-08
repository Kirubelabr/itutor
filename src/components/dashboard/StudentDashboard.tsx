import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart2, BookOpen, Brain, Calendar, Clock, Download, ExternalLink, FileText, Lightbulb, MessageSquare, Search, Send, Target,
  TrendingUp, Video
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Session {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface Resource {
  id: string;
  title: string;
  type: string;
  subject: string;
  description: string;
}

interface ProgressData {
  subject: string;
  progress: number;
}

interface AIResource {
  id: string;
  title: string;
  type: "study_guide" | "video" | "article" | "practice_test" | "flashcards";
  subject: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  downloadUrl?: string;
  viewUrl?: string;
}

interface AIStrategy {
  id: string;
  title: string;
  category: "study_technique" | "time_management" | "exam_prep" | "motivation";
  description: string;
  tips: string[];
}

interface ChatMessage {
  id: string;
  sender: "user" | "buze";
  message: string;
  timestamp: Date;
}

interface StudentDashboardProps {
  studentName?: string;
  upcomingSessions?: Session[];
  completedSessions?: Session[];
  progressData?: ProgressData[];
  recommendedResources?: Resource[];
  aiResources?: AIResource[];
  aiStrategies?: AIStrategy[];
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentName = "Alex Johnson",
  upcomingSessions = [
    {
      id: "1",
      tutorName: "Dr. Sarah Miller",
      tutorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      subject: "Advanced Calculus",
      date: "Today",
      time: "4:00 PM",
      duration: "60 min",
      status: "upcoming",
    },
    {
      id: "2",
      tutorName: "Prof. Michael Chen",
      tutorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      subject: "Organic Chemistry",
      date: "Tomorrow",
      time: "2:30 PM",
      duration: "90 min",
      status: "upcoming",
    },
    {
      id: "3",
      tutorName: "Dr. Emily Rodriguez",
      tutorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      subject: "World History",
      date: "May 15, 2023",
      time: "5:00 PM",
      duration: "60 min",
      status: "upcoming",
    },
  ],
  completedSessions = [
    {
      id: "4",
      tutorName: "Dr. James Wilson",
      tutorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      subject: "Physics",
      date: "May 5, 2023",
      time: "3:00 PM",
      duration: "60 min",
      status: "completed",
    },
    {
      id: "5",
      tutorName: "Prof. Lisa Wang",
      tutorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      subject: "Literature",
      date: "May 3, 2023",
      time: "4:30 PM",
      duration: "60 min",
      status: "completed",
    },
  ],
  progressData = [
    { subject: "Mathematics", progress: 75 },
    { subject: "Chemistry", progress: 60 },
    { subject: "History", progress: 85 },
    { subject: "Physics", progress: 45 },
  ],
  recommendedResources = [
    {
      id: "1",
      title: "Calculus Made Easy",
      type: "E-Book",
      subject: "Mathematics",
      description:
        "A comprehensive guide to calculus fundamentals with practice problems.",
    },
    {
      id: "2",
      title: "Chemistry Lab Techniques",
      type: "Video Series",
      subject: "Chemistry",
      description:
        "Step-by-step video tutorials on essential laboratory techniques.",
    },
    {
      id: "3",
      title: "World History Timeline",
      type: "Interactive Tool",
      subject: "History",
      description:
        "Interactive timeline covering major historical events and periods.",
    },
  ],
  aiResources = [
    {
      id: "1",
      title: "Advanced Calculus Study Guide",
      type: "study_guide",
      subject: "Mathematics",
      description:
        "AI-generated study guide covering limits, derivatives, and integrals with personalized examples.",
      difficulty: "advanced",
      estimatedTime: "2 hours",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Interactive Chemistry Simulations",
      type: "video",
      subject: "Chemistry",
      description:
        "Visual demonstrations of molecular interactions and chemical reactions.",
      difficulty: "intermediate",
      estimatedTime: "45 min",
      viewUrl: "#",
    },
    {
      id: "3",
      title: "History Essay Writing Guide",
      type: "article",
      subject: "History",
      description:
        "Comprehensive guide on structuring historical arguments and citing sources.",
      difficulty: "intermediate",
      estimatedTime: "30 min",
      viewUrl: "#",
    },
    {
      id: "4",
      title: "Physics Practice Test Generator",
      type: "practice_test",
      subject: "Physics",
      description:
        "AI-powered practice tests that adapt to your learning progress and identify weak areas.",
      difficulty: "intermediate",
      estimatedTime: "60 min",
      viewUrl: "#",
    },
    {
      id: "5",
      title: "Math Formula Flashcards",
      type: "flashcards",
      subject: "Mathematics",
      description:
        "Interactive flashcards for memorizing key mathematical formulas and concepts.",
      difficulty: "beginner",
      estimatedTime: "20 min",
      viewUrl: "#",
    },
  ],
  aiStrategies = [
    {
      id: "1",
      title: "Active Recall Technique",
      category: "study_technique",
      description:
        "Improve retention by actively testing yourself instead of passive reading.",
      tips: [
        "Close your notes and try to recall key concepts",
        "Use flashcards or practice questions",
        "Explain concepts out loud to yourself",
        "Create mind maps from memory",
      ],
    },
    {
      id: "2",
      title: "Pomodoro Study Sessions",
      category: "time_management",
      description:
        "Break study time into focused 25-minute intervals with short breaks.",
      tips: [
        "Set a timer for 25 minutes of focused study",
        "Take a 5-minute break after each session",
        "After 4 sessions, take a longer 15-30 minute break",
        "Eliminate distractions during study time",
      ],
    },
    {
      id: "3",
      title: "Strategic Exam Preparation",
      category: "exam_prep",
      description:
        "Optimize your exam preparation with targeted practice and review.",
      tips: [
        "Review past exams and identify common question types",
        "Practice under timed conditions",
        "Focus extra time on your weakest subjects",
        "Create a study schedule leading up to the exam",
      ],
    },
    {
      id: "4",
      title: "Motivation Maintenance",
      category: "motivation",
      description:
        "Stay motivated throughout your learning journey with these techniques.",
      tips: [
        "Set specific, achievable daily goals",
        "Reward yourself for completing study sessions",
        "Track your progress visually",
        "Connect with study groups or partners",
      ],
    },
  ],
}) => {
  const [isBuzeChatOpen, setIsBuzeChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "buze",
      message:
        "Hi! I'm Buze, your AI learning assistant. How can I help you study today?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

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

      // Simulate Buze response
      setTimeout(() => {
        const buzeResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "buze",
          message:
            "That's a great question! Let me help you with that. Based on your current progress, I recommend focusing on practice problems and reviewing the fundamentals.",
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, buzeResponse]);
      }, 1000);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "study_guide":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "practice_test":
        return <MessageSquare className="h-4 w-4" />;
      case "flashcards":
        return <Brain className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "study_technique":
        return <Brain className="h-4 w-4" />;
      case "time_management":
        return <Clock className="h-4 w-4" />;
      case "exam_prep":
        return <Target className="h-4 w-4" />;
      case "motivation":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=student"
              alt="Student"
            />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{studentName}</h3>
            <p className="text-xs text-muted-foreground">Student</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Link to="/student/find-tutor">
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Tutors
            </Button>
          </Link>
          <Link to="/student/sessions">
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              My Sessions
            </Button>
          </Link>
          <Link to="/student/assistant">
            <Button variant="ghost" className="w-full justify-start">
              <Brain className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
          </Link>
          <Link to="/student/messages">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setIsBuzeChatOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart2 className="mr-2 h-4 w-4" />
            Progress
          </Button>
        </nav>

        <div className="mt-auto">
          <Button variant="outline" className="w-full">
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Welcome back, {studentName.split(" ")[0]}!
          </h1>
          <div className="flex gap-2">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Find a Tutor
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Browse Schedules
            </Button>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Sessions</h2>
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge>{session.subject}</Badge>
                        <Badge variant="outline">{session.date}</Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">
                        {session.subject}
                      </CardTitle>
                      <CardDescription>
                        with {session.tutorName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={session.tutorAvatar}
                            alt={session.tutorName}
                          />
                          <AvatarFallback>
                            {session.tutorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {session.tutorName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {session.time} • {session.duration}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="default" className="w-full">
                        Join Session
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge>{session.subject}</Badge>
                        <Badge variant="outline">{session.date}</Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">
                        {session.subject}
                      </CardTitle>
                      <CardDescription>
                        with {session.tutorName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={session.tutorAvatar}
                            alt={session.tutorName}
                          />
                          <AvatarFallback>
                            {session.tutorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {session.tutorName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {session.time} • {session.duration}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full">
                        View Recording
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Learning Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Learning Assistant</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Resources */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle>AI Study Resources</CardTitle>
                </div>
                <CardDescription>
                  Personalized learning materials generated just for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {aiResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="border rounded-lg p-3 hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getResourceIcon(resource.type)}
                          <h4 className="font-medium text-sm">
                            {resource.title}
                          </h4>
                        </div>
                        <div className="flex space-x-1">
                          {resource.downloadUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                          {resource.viewUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.subject}
                          </Badge>
                          <Badge
                            className={`text-xs ${getDifficultyColor(resource.difficulty)}`}
                            variant="secondary"
                          >
                            {resource.difficulty}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {resource.estimatedTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Brain className="mr-2 h-4 w-4" />
                  Generate More Resources
                </Button>
              </CardFooter>
            </Card>

            {/* AI Study Strategies */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <CardTitle>Study Strategies</CardTitle>
                </div>
                <CardDescription>
                  AI-recommended techniques to improve your learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {aiStrategies.map((strategy) => (
                    <div key={strategy.id} className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        {getCategoryIcon(strategy.category)}
                        <h4 className="font-medium text-sm">
                          {strategy.title}
                        </h4>
                        <Badge variant="outline" className="text-xs ml-auto">
                          {strategy.category.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {strategy.description}
                      </p>
                      <div className="space-y-1">
                        {strategy.tips.slice(0, 2).map((tip, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-xs">{tip}</p>
                          </div>
                        ))}
                        {strategy.tips.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{strategy.tips.length - 2} more tips
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Get More Strategies
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Progress and Resources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>
                Track your progress across subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.map((item) => (
                  <div key={item.subject} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.subject}</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Progress
              </Button>
            </CardFooter>
          </Card>

          {/* Recommended Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
              <CardDescription>Personalized learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedResources.map((resource) => (
                  <div key={resource.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{resource.title}</h4>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {resource.subject}
                    </p>
                    <p className="text-sm">{resource.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Browse All Resources
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Buze Chat Assistant Banner */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Chat with Buze, your AI study buddy!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant help with homework, study tips, exam preparation,
                  and personalized learning advice.
                </p>
                <Button onClick={() => setIsBuzeChatOpen(true)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Buze
                </Button>
              </div>
              <div className="hidden md:block">
                <MessageSquare className="h-24 w-24 text-primary/20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buze Chat Dialog */}
        <Dialog open={isBuzeChatOpen} onOpenChange={setIsBuzeChatOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=buze"
                    alt="Buze"
                  />
                  <AvatarFallback>BZ</AvatarFallback>
                </Avatar>
                <span>Chat with Buze</span>
              </DialogTitle>
              <DialogDescription>
                Your AI learning assistant is here to help!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col h-96">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/20">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border"
                      }`}
                    >
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

              {/* Chat Input */}
              <div className="flex space-x-2 mt-4">
                <Textarea
                  placeholder="Ask Buze anything about your studies..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 min-h-[60px] max-h-[120px]"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Floating Chat Button */}
        <Button
          onClick={() => setIsBuzeChatOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default StudentDashboard;
