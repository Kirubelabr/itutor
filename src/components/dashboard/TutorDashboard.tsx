import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  Users,
  BookOpen,
  Settings,
  Bell,
  ChevronRight,
  MessageSquare,
  Brain,
  FileText,
  Video,
  Download,
  ExternalLink,
} from "lucide-react";

interface TutorDashboardProps {
  tutorName?: string;
  profileCompletion?: number;
  upcomingSessions?: Array<{
    id: string;
    studentName: string;
    studentAvatar?: string;
    subject: string;
    date: Date;
    time: string;
    duration: string;
    status: "upcoming" | "completed" | "cancelled";
  }>;
  students?: Array<{
    id: string;
    name: string;
    avatar?: string;
    subject: string;
    sessionsCount: number;
    lastSession: string;
  }>;
  aiSuggestions?: Array<{
    id: string;
    type: string;
    message: string;
  }>;
  aiResources?: Array<{
    id: string;
    title: string;
    type: "lesson_plan" | "worksheet" | "video" | "article" | "quiz";
    subject: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    estimatedTime: string;
    downloadUrl?: string;
    viewUrl?: string;
  }>;
}

export default function TutorDashboard({
  tutorName = "Sarah Johnson",
  profileCompletion = 85,
  upcomingSessions = [
    {
      id: "1",
      studentName: "Alex Chen",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      subject: "Advanced Calculus",
      date: new Date(),
      time: "3:00 PM - 4:00 PM",
      duration: "60 min",
      status: "upcoming",
    },
    {
      id: "2",
      studentName: "Jamie Smith",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      subject: "Physics",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "1:00 PM - 2:30 PM",
      duration: "90 min",
      status: "upcoming",
    },
    {
      id: "3",
      studentName: "Taylor Wong",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      subject: "Chemistry",
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: "10:00 AM - 11:00 AM",
      duration: "60 min",
      status: "upcoming",
    },
  ],
  students = [
    {
      id: "1",
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      subject: "Advanced Calculus",
      sessionsCount: 5,
      lastSession: "Yesterday",
    },
    {
      id: "2",
      name: "Jamie Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      subject: "Physics",
      sessionsCount: 3,
      lastSession: "Last week",
    },
    {
      id: "3",
      name: "Taylor Wong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      subject: "Chemistry",
      sessionsCount: 2,
      lastSession: "2 weeks ago",
    },
    {
      id: "4",
      name: "Morgan Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
      subject: "Biology",
      sessionsCount: 1,
      lastSession: "3 weeks ago",
    },
  ],
  aiSuggestions = [
    {
      id: "1",
      type: "Profile Enhancement",
      message:
        "Adding more details about your teaching methodology could increase your profile views by 30%.",
    },
    {
      id: "2",
      type: "Availability",
      message:
        "Opening weekend slots could help you match with 5 more students looking for tutors.",
    },
    {
      id: "3",
      type: "Subject Expertise",
      message:
        "Consider adding 'AP Calculus' to your subjects based on your qualifications.",
    },
  ],
  aiResources = [
    {
      id: "1",
      title: "Advanced Calculus Problem Sets",
      type: "worksheet",
      subject: "Mathematics",
      description:
        "Comprehensive problem sets covering limits, derivatives, and integrals with step-by-step solutions.",
      difficulty: "advanced",
      estimatedTime: "45 min",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Interactive Physics Simulations",
      type: "video",
      subject: "Physics",
      description:
        "Visual demonstrations of complex physics concepts including wave mechanics and thermodynamics.",
      difficulty: "intermediate",
      estimatedTime: "30 min",
      viewUrl: "#",
    },
    {
      id: "3",
      title: "Chemistry Lab Safety Guide",
      type: "article",
      subject: "Chemistry",
      description:
        "Essential safety protocols and best practices for conducting chemistry experiments.",
      difficulty: "beginner",
      estimatedTime: "15 min",
      viewUrl: "#",
    },
    {
      id: "4",
      title: "Calculus Concept Quiz Generator",
      type: "quiz",
      subject: "Mathematics",
      description:
        "AI-generated quizzes that adapt to student performance and identify knowledge gaps.",
      difficulty: "intermediate",
      estimatedTime: "20 min",
      viewUrl: "#",
    },
    {
      id: "5",
      title: "Effective Tutoring Strategies",
      type: "lesson_plan",
      subject: "General",
      description:
        "Research-backed teaching methods to improve student engagement and learning outcomes.",
      difficulty: "intermediate",
      estimatedTime: "25 min",
      downloadUrl: "#",
    },
  ],
}: TutorDashboardProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">TutorConnect</h1>
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2 bg-accent/50 text-accent-foreground rounded-md px-3 py-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground rounded-md px-3 py-2 cursor-pointer">
            <Users className="h-5 w-5" />
            <span>Students</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground rounded-md px-3 py-2 cursor-pointer">
            <BookOpen className="h-5 w-5" />
            <span>Sessions</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground rounded-md px-3 py-2 cursor-pointer">
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground rounded-md px-3 py-2 cursor-pointer">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center space-x-2 p-2">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{tutorName}</p>
              <p className="text-xs text-muted-foreground">Tutor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {tutorName.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your tutoring today.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Profile Completion */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Completion</CardTitle>
            <CardDescription>
              Complete your profile to attract more students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {profileCompletion}% Complete
                </span>
                <span className="text-sm text-muted-foreground">
                  Update Profile
                </span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Calendar and Sessions */}
          <div className="xl:col-span-2 space-y-6">
            <Tabs defaultValue="upcoming" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Add Availability
                </Button>
              </div>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={session.studentAvatar} />
                            <AvatarFallback>
                              {session.studentName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">
                              {session.studentName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {session.subject}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {session.date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {session.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Badge variant="outline">{session.duration}</Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Session</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="calendar">
                <Card>
                  <CardContent className="p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                    <div className="mt-4 space-y-2">
                      <h3 className="font-medium">
                        Sessions on{" "}
                        {date?.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </h3>
                      {upcomingSessions
                        .filter(
                          (session) =>
                            session.date.toDateString() ===
                            date?.toDateString(),
                        )
                        .map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center justify-between p-2 border rounded-md"
                          >
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={session.studentAvatar} />
                                <AvatarFallback>
                                  {session.studentName.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{session.studentName}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {session.time}
                            </span>
                          </div>
                        ))}
                      {upcomingSessions.filter(
                        (session) =>
                          session.date.toDateString() === date?.toDateString(),
                      ).length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No sessions scheduled for this day
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Middle Column - Students and AI Suggestions */}
          <div className="space-y-6">
            {/* Student Management */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Student Management</CardTitle>
                <CardDescription>Your current students</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>
                            {student.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.subject}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p>{student.sessionsCount} sessions</p>
                        <p className="text-xs text-muted-foreground">
                          Last: {student.lastSession}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <Button variant="outline" className="w-full">
                    View All Students
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  AI Profile Suggestions
                </CardTitle>
                <CardDescription>
                  Improve your profile with AI recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{suggestion.type}</Badge>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Apply
                        </Button>
                      </div>
                      <p className="text-sm">{suggestion.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Resources */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">
                    AI Teaching Resources
                  </CardTitle>
                </div>
                <CardDescription>
                  Personalized resources to enhance your teaching
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y max-h-96 overflow-y-auto">
                  {aiResources.map((resource) => {
                    const getResourceIcon = (type: string) => {
                      switch (type) {
                        case "lesson_plan":
                          return <FileText className="h-4 w-4" />;
                        case "video":
                          return <Video className="h-4 w-4" />;
                        case "worksheet":
                          return <FileText className="h-4 w-4" />;
                        case "article":
                          return <BookOpen className="h-4 w-4" />;
                        case "quiz":
                          return <MessageSquare className="h-4 w-4" />;
                        default:
                          return <FileText className="h-4 w-4" />;
                      }
                    };

                    const getDifficultyColor = (difficulty: string) => {
                      switch (difficulty) {
                        case "beginner":
                          return "bg-green-100 text-green-800";
                        case "intermediate":
                          return "bg-yellow-100 text-yellow-800";
                        case "advanced":
                          return "bg-red-100 text-red-800";
                        default:
                          return "bg-gray-100 text-gray-800";
                      }
                    };

                    return (
                      <div key={resource.id} className="p-4 hover:bg-muted/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getResourceIcon(resource.type)}
                            <h3 className="font-medium text-sm">
                              {resource.title}
                            </h3>
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
                    );
                  })}
                </div>
                <div className="p-4 border-t">
                  <Button variant="outline" className="w-full" size="sm">
                    <Brain className="mr-2 h-4 w-4" />
                    Generate More Resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">AI Quick Actions</CardTitle>
                <CardDescription>
                  AI-powered tools for better teaching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Create Custom Lesson Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Generate Practice Questions
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Student Progress
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Find Teaching Videos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
