import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Bell,
  BookOpen,
  Brain,
  CalendarIcon,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Filter,
  MessageSquare,
  MoreHorizontal,
  PauseCircle,
  Plus,
  Search,
  Settings,
  Star,
  TrendingUp,
  Upload,
  Users,
  Video,
  X,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Student {
  id: string;
  fullName: string;
  profilePicture?: string;
  age: number;
  gradeLevel: string;
  subjectsEnrolled: string[];
  languagePreferences: string[];
  assignedTutor?: string;
  enrollmentStatus: "active" | "paused" | "completed";
  upcomingSessions: Array<{
    id: string;
    date: string;
    time: string;
    subject: string;
    duration: string;
  }>;
  pastSessions: Array<{
    id: string;
    date: string;
    time: string;
    subject: string;
    duration: string;
    attendance: "present" | "absent" | "late";
    notes: string;
    rating?: number;
  }>;
  progress: Record<string, number>;
  aiInsights: string[];
  tutorNotes: string;
  homework: Array<{
    id: string;
    title: string;
    subject: string;
    assigned: string;
    due: string;
    status: "pending" | "submitted" | "graded";
    grade?: string;
  }>;
  testScores: Array<{
    id: string;
    test: string;
    subject: string;
    score: number;
    maxScore: number;
    date: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
  }>;
  billing: {
    sessionsBilled: number;
    amountPending: number;
    amountReceived: number;
    lastPayment: string;
  };
  feedback: Array<{
    id: string;
    from: "student" | "parent";
    message: string;
    date: string;
    rating?: number;
  }>;
  waitingListPosition?: number;
}

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
  students?: Student[];
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
      fullName: "Alex Chen",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      age: 17,
      gradeLevel: "Grade 12",
      subjectsEnrolled: ["Advanced Calculus", "Physics"],
      languagePreferences: ["English", "Mandarin"],
      enrollmentStatus: "active" as const,
      upcomingSessions: [
        {
          id: "s1",
          date: "2024-01-15",
          time: "3:00 PM - 4:00 PM",
          subject: "Advanced Calculus",
          duration: "60 min",
        },
      ],
      pastSessions: [
        {
          id: "ps1",
          date: "2024-01-10",
          time: "3:00 PM - 4:00 PM",
          subject: "Advanced Calculus",
          duration: "60 min",
          attendance: "present" as const,
          notes:
            "Great progress on derivatives. Student showed excellent understanding.",
          rating: 5,
        },
        {
          id: "ps2",
          date: "2024-01-08",
          time: "3:00 PM - 4:00 PM",
          subject: "Physics",
          duration: "60 min",
          attendance: "present" as const,
          notes: "Worked on momentum and energy conservation.",
          rating: 4,
        },
      ],
      progress: {
        "Advanced Calculus": 85,
        Physics: 78,
      },
      aiInsights: [
        "Student excels in analytical thinking",
        "Recommend more practice with word problems",
        "Strong foundation in algebra",
      ],
      tutorNotes:
        "Highly motivated student. Responds well to challenging problems.",
      homework: [
        {
          id: "hw1",
          title: "Derivative Practice Set",
          subject: "Advanced Calculus",
          assigned: "2024-01-10",
          due: "2024-01-15",
          status: "submitted" as const,
          grade: "A-",
        },
      ],
      testScores: [
        {
          id: "t1",
          test: "Calculus Midterm",
          subject: "Advanced Calculus",
          score: 92,
          maxScore: 100,
          date: "2024-01-05",
        },
      ],
      documents: [
        {
          id: "d1",
          name: "Calculus Notes - Chapter 3.pdf",
          type: "PDF",
          uploadDate: "2024-01-10",
          size: "2.3 MB",
        },
      ],
      billing: {
        sessionsBilled: 8,
        amountPending: 150,
        amountReceived: 600,
        lastPayment: "2024-01-01",
      },
      feedback: [
        {
          id: "f1",
          from: "parent" as const,
          message: "Alex has shown great improvement in math confidence.",
          date: "2024-01-05",
          rating: 5,
        },
      ],
    },
    {
      id: "2",
      fullName: "Jamie Smith",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      age: 16,
      gradeLevel: "Grade 11",
      subjectsEnrolled: ["Physics", "Chemistry"],
      languagePreferences: ["English"],
      enrollmentStatus: "active" as const,
      upcomingSessions: [
        {
          id: "s2",
          date: "2024-01-16",
          time: "1:00 PM - 2:30 PM",
          subject: "Physics",
          duration: "90 min",
        },
      ],
      pastSessions: [
        {
          id: "ps3",
          date: "2024-01-09",
          time: "1:00 PM - 2:30 PM",
          subject: "Physics",
          duration: "90 min",
          attendance: "present" as const,
          notes: "Covered wave mechanics. Student needs more practice.",
          rating: 4,
        },
      ],
      progress: {
        Physics: 72,
        Chemistry: 68,
      },
      aiInsights: [
        "Visual learner - benefits from diagrams",
        "Struggles with abstract concepts",
        "Improving steadily with consistent practice",
      ],
      tutorNotes: "Needs encouragement and visual aids for complex topics.",
      homework: [
        {
          id: "hw2",
          title: "Wave Problems",
          subject: "Physics",
          assigned: "2024-01-09",
          due: "2024-01-16",
          status: "pending" as const,
        },
      ],
      testScores: [
        {
          id: "t2",
          test: "Physics Quiz 1",
          subject: "Physics",
          score: 78,
          maxScore: 100,
          date: "2024-01-03",
        },
      ],
      documents: [],
      billing: {
        sessionsBilled: 6,
        amountPending: 225,
        amountReceived: 450,
        lastPayment: "2023-12-28",
      },
      feedback: [
        {
          id: "f2",
          from: "student" as const,
          message: "The tutor explains things really well!",
          date: "2024-01-02",
          rating: 4,
        },
      ],
    },
    {
      id: "3",
      fullName: "Taylor Wong",
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      age: 15,
      gradeLevel: "Grade 10",
      subjectsEnrolled: ["Chemistry", "Biology"],
      languagePreferences: ["English", "Cantonese"],
      enrollmentStatus: "paused" as const,
      upcomingSessions: [],
      pastSessions: [
        {
          id: "ps4",
          date: "2023-12-20",
          time: "10:00 AM - 11:00 AM",
          subject: "Chemistry",
          duration: "60 min",
          attendance: "present" as const,
          notes:
            "Last session before winter break. Good understanding of stoichiometry.",
          rating: 5,
        },
      ],
      progress: {
        Chemistry: 82,
        Biology: 75,
      },
      aiInsights: [
        "Strong in memorization tasks",
        "Excellent lab technique",
        "May benefit from more conceptual discussions",
      ],
      tutorNotes: "Paused for winter break. Will resume in February.",
      homework: [],
      testScores: [
        {
          id: "t3",
          test: "Chemistry Final",
          subject: "Chemistry",
          score: 88,
          maxScore: 100,
          date: "2023-12-18",
        },
      ],
      documents: [
        {
          id: "d2",
          name: "Lab Report - Acid Base Titration.docx",
          type: "DOCX",
          uploadDate: "2023-12-15",
          size: "1.8 MB",
        },
      ],
      billing: {
        sessionsBilled: 4,
        amountPending: 0,
        amountReceived: 320,
        lastPayment: "2023-12-20",
      },
      feedback: [],
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
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("recent");
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.subjectsEnrolled.some((subject) =>
        subject.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesStatus =
      filterStatus === "all" || student.enrollmentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.fullName.localeCompare(b.fullName);
      case "progress":
        const avgProgressA =
          Object.values(a.progress).reduce((sum, val) => sum + val, 0) /
          Object.values(a.progress).length;
        const avgProgressB =
          Object.values(b.progress).reduce((sum, val) => sum + val, 0) /
          Object.values(b.progress).length;
        return avgProgressB - avgProgressA;
      case "recent":
      default:
        return (
          new Date(b.pastSessions[0]?.date || 0).getTime() -
          new Date(a.pastSessions[0]?.date || 0).getTime()
        );
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">TutorConnect</h1>
        </div>

        <div className="flex flex-col space-y-1">
          <div
            className={`flex items-center space-x-2 rounded-md px-3 py-2 cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-accent/50 text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md px-3 py-2 cursor-pointer ${
              activeTab === "students"
                ? "bg-accent/50 text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("students")}
          >
            <Users className="h-5 w-5" />
            <span>Students</span>
          </div>
          <Link to="/tutor/sessions">
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground rounded-md px-3 py-2 cursor-pointer">
              <BookOpen className="h-5 w-5" />
              <span>Sessions</span>
            </div>
          </Link>
          <Link to="/tutor/messages">
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground rounded-md px-3 py-2 cursor-pointer">
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </div>
          </Link>
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
        {activeTab === "dashboard" && (
          <>
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
                      <TabsTrigger value="upcoming">
                        Upcoming Sessions
                      </TabsTrigger>
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
                              session.date.toDateString() ===
                              date?.toDateString(),
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
                    <CardTitle className="text-lg">
                      Student Management
                    </CardTitle>
                    <CardDescription>Your current students</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {students.slice(0, 4).map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                            setSelectedStudent(student);
                            setActiveTab("students");
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={student.profilePicture} />
                              <AvatarFallback>
                                {student.fullName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.fullName}</p>
                              <p className="text-xs text-muted-foreground">
                                {student.subjectsEnrolled.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <Badge
                              variant={
                                student.enrollmentStatus === "active"
                                  ? "default"
                                  : student.enrollmentStatus === "paused"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {student.enrollmentStatus}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {student.pastSessions.length} sessions
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab("students")}
                      >
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                            >
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
                          <div
                            key={resource.id}
                            className="p-4 hover:bg-muted/50"
                          >
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
          </>
        )}

        {activeTab === "students" && (
          <div className="space-y-6">
            {/* Students Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Student Management</h1>
                <p className="text-muted-foreground">
                  Manage your students, track progress, and view detailed
                  profiles
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Export Reports
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students by name or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent Activity</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {selectedStudent ? (
              /* Student Detail View */
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStudent(null)}
                  >
                    ← Back to Students
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={selectedStudent.profilePicture} />
                          <AvatarFallback className="text-lg">
                            {selectedStudent.fullName.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-2xl">
                            {selectedStudent.fullName}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {selectedStudent.gradeLevel} • Age{" "}
                            {selectedStudent.age}
                          </CardDescription>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge
                              variant={
                                selectedStudent.enrollmentStatus === "active"
                                  ? "default"
                                  : selectedStudent.enrollmentStatus ===
                                      "paused"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {selectedStudent.enrollmentStatus}
                            </Badge>
                            {selectedStudent.waitingListPosition && (
                              <Badge variant="outline">
                                Waiting List #
                                {selectedStudent.waitingListPosition}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Subjects Enrolled
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedStudent.subjectsEnrolled.map(
                            (subject, index) => (
                              <Badge key={index} variant="secondary">
                                {subject}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Languages
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedStudent.languagePreferences.map(
                            (lang, index) => (
                              <Badge key={index} variant="outline">
                                {lang}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Assigned Tutor
                        </Label>
                        <p className="mt-1">
                          {selectedStudent.assignedTutor || "You (Primary)"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="homework">Homework</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Upcoming Sessions */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Upcoming Sessions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedStudent.upcomingSessions.length > 0 ? (
                            <div className="space-y-3">
                              {selectedStudent.upcomingSessions.map(
                                (session) => (
                                  <div
                                    key={session.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div>
                                      <p className="font-medium">
                                        {session.subject}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {session.date} • {session.time}
                                      </p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline">
                                        Reschedule
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-center py-4">
                              No upcoming sessions scheduled
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      {/* AI Insights */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <Brain className="h-5 w-5" />
                            <span>AI Insights</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedStudent.aiInsights.map(
                              (insight, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm">{insight}</p>
                                </div>
                              ),
                            )}
                          </div>
                          <div className="mt-4 space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Brain className="mr-2 h-4 w-4" />
                              Generate Teaching Strategies
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Create Quiz
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Progress Overview */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Subject Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {Object.entries(selectedStudent.progress).map(
                              ([subject, progress]) => (
                                <div key={subject}>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">
                                      {subject}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {progress}%
                                    </span>
                                  </div>
                                  <Progress value={progress} className="h-2" />
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tutor Notes */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Tutor Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            value={selectedStudent.tutorNotes}
                            placeholder="Add your notes about this student..."
                            className="min-h-24"
                            readOnly
                          />
                          <Button size="sm" className="mt-2">
                            Edit Notes
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="sessions" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Session History</h3>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Sessions
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {selectedStudent.pastSessions.map((session) => (
                        <Card key={session.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    session.attendance === "present"
                                      ? "bg-green-500"
                                      : session.attendance === "late"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                />
                                <div>
                                  <h4 className="font-medium">
                                    {session.subject}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {session.date} • {session.time} •{" "}
                                    {session.duration}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="capitalize">
                                  {session.attendance}
                                </Badge>
                                {session.rating && (
                                  <div className="flex items-center space-x-1">
                                    {renderStars(session.rating)}
                                  </div>
                                )}
                              </div>
                            </div>
                            {session.notes && (
                              <div className="bg-muted p-3 rounded-lg">
                                <p className="text-sm">{session.notes}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Subject Progress */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Subject Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {Object.entries(selectedStudent.progress).map(
                              ([subject, progress]) => (
                                <div key={subject}>
                                  <div className="flex justify-between mb-2">
                                    <span className="font-medium">
                                      {subject}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {progress}%
                                    </span>
                                  </div>
                                  <Progress value={progress} className="h-3" />
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Test Scores */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Test Scores & Assessments
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedStudent.testScores.map((test) => (
                              <div
                                key={test.id}
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div>
                                  <p className="font-medium">{test.test}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {test.subject} • {test.date}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">
                                    {test.score}/{test.maxScore}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {Math.round(
                                      (test.score / test.maxScore) * 100,
                                    )}
                                    %
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="homework" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Homework & Assignments
                      </h3>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Assign Homework
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {selectedStudent.homework.map((hw) => (
                        <Card key={hw.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    hw.status === "graded"
                                      ? "bg-green-500"
                                      : hw.status === "submitted"
                                        ? "bg-blue-500"
                                        : "bg-yellow-500"
                                  }`}
                                />
                                <div>
                                  <h4 className="font-medium">{hw.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {hw.subject} • Assigned: {hw.assigned} •
                                    Due: {hw.due}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="capitalize">
                                  {hw.status}
                                </Badge>
                                {hw.grade && (
                                  <Badge variant="secondary">{hw.grade}</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Shared Documents & Files
                      </h3>
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {selectedStudent.documents.length > 0 ? (
                        selectedStudent.documents.map((doc) => (
                          <Card key={doc.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-8 w-8 text-muted-foreground" />
                                  <div>
                                    <h4 className="font-medium">{doc.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {doc.type} • {doc.size} • Uploaded{" "}
                                      {doc.uploadDate}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card>
                          <CardContent className="p-8 text-center">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                              No documents uploaded yet
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="billing" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <DollarSign className="h-5 w-5" />
                            <span>Sessions Billed</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">
                            {selectedStudent.billing.sessionsBilled}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total sessions
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <Clock className="h-5 w-5" />
                            <span>Amount Pending</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-yellow-600">
                            ${selectedStudent.billing.amountPending}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Awaiting payment
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5" />
                            <span>Amount Received</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-green-600">
                            ${selectedStudent.billing.amountReceived}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Last payment: {selectedStudent.billing.lastPayment}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Payment Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-2">
                          <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export Invoice
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Payment Reminder
                          </Button>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Invoice
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Student/Parent Feedback */}
                    {selectedStudent.feedback.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedStudent.feedback.map((feedback) => (
                              <div
                                key={feedback.id}
                                className="border-l-4 border-primary pl-4"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
                                    From {feedback.from}
                                  </Badge>
                                  <div className="flex items-center space-x-2">
                                    {feedback.rating &&
                                      renderStars(feedback.rating)}
                                    <span className="text-sm text-muted-foreground">
                                      {feedback.date}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm">{feedback.message}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              /* Students List View */
              <div className="space-y-4">
                {sortedStudents.map((student) => {
                  const avgProgress =
                    Object.values(student.progress).reduce(
                      (sum, val) => sum + val,
                      0,
                    ) / Object.values(student.progress).length;

                  return (
                    <Card
                      key={student.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.profilePicture} />
                              <AvatarFallback>
                                {student.fullName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {student.fullName}
                              </h3>
                              <p className="text-muted-foreground">
                                {student.gradeLevel} • Age {student.age}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {student.subjectsEnrolled
                                  .slice(0, 2)
                                  .map((subject, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {subject}
                                    </Badge>
                                  ))}
                                {student.subjectsEnrolled.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{student.subjectsEnrolled.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-sm font-medium">
                                {student.pastSessions.length}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Sessions
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">
                                {Math.round(avgProgress)}%
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Progress
                              </p>
                            </div>
                            <div className="text-center">
                              <Badge
                                variant={
                                  student.enrollmentStatus === "active"
                                    ? "default"
                                    : student.enrollmentStatus === "paused"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {student.enrollmentStatus}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {student.upcomingSessions.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm font-medium mb-2">
                              Next Session:
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{student.upcomingSessions[0].subject}</span>
                              <span>•</span>
                              <span>{student.upcomingSessions[0].date}</span>
                              <span>•</span>
                              <span>{student.upcomingSessions[0].time}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}

                {sortedStudents.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No students found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm || filterStatus !== "all"
                          ? "Try adjusting your search or filters"
                          : "You haven't added any students yet"}
                      </p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Student
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
