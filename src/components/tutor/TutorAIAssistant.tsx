import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  FileText,
  Video,
  BookOpen,
  MessageSquare,
  Download,
  ExternalLink,
  Search,
  ArrowLeft,
  Sparkles,
  Users,
  BarChart3,
  Target,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AIResource {
  id: string;
  title: string;
  type: "lesson_plan" | "worksheet" | "video" | "article" | "quiz";
  subject: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  downloadUrl?: string;
  viewUrl?: string;
}

interface AISuggestion {
  id: string;
  type: string;
  message: string;
  priority: "high" | "medium" | "low";
}

interface TutorAIAssistantProps {
  aiResources?: AIResource[];
  aiSuggestions?: AISuggestion[];
}

export default function TutorAIAssistant({
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
  aiSuggestions = [
    {
      id: "1",
      type: "Profile Enhancement",
      message:
        "Adding more details about your teaching methodology could increase your profile views by 30%.",
      priority: "high",
    },
    {
      id: "2",
      type: "Availability",
      message:
        "Opening weekend slots could help you match with 5 more students looking for tutors.",
      priority: "medium",
    },
    {
      id: "3",
      type: "Subject Expertise",
      message:
        "Consider adding 'AP Calculus' to your subjects based on your qualifications.",
      priority: "medium",
    },
    {
      id: "4",
      type: "Student Engagement",
      message:
        "Your students show 20% better retention when you use visual aids. Consider incorporating more diagrams.",
      priority: "high",
    },
  ],
}: TutorAIAssistantProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

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
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredResources = aiResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesType =
      selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const subjects = [...new Set(aiResources.map((r) => r.subject))];
  const types = [...new Set(aiResources.map((r) => r.type))];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/tutor/dashboard")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <span>AI Teaching Assistant</span>
              </h1>
              <p className="text-muted-foreground">
                AI-powered resources and insights to enhance your teaching
                effectiveness
              </p>
            </div>
          </div>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Custom Content
          </Button>
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resources">Teaching Resources</TabsTrigger>
            <TabsTrigger value="suggestions">AI Insights</TabsTrigger>
            <TabsTrigger value="analytics">Student Analytics</TabsTrigger>
            <TabsTrigger value="generator">Content Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="mt-6">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search teaching resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">All Subjects</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">All Types</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getResourceIcon(resource.type)}
                        <CardTitle className="text-lg">
                          {resource.title}
                        </CardTitle>
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
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
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
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" size="sm">
                      Use Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiSuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">
                        {suggestion.type}
                      </CardTitle>
                      <Badge
                        className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                        variant="secondary"
                      >
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                    <CardDescription>{suggestion.message}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex space-x-2 w-full">
                      <Button variant="outline" className="flex-1" size="sm">
                        Dismiss
                      </Button>
                      <Button className="flex-1" size="sm">
                        Apply Suggestion
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Student Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Student Performance</span>
                  </CardTitle>
                  <CardDescription>
                    Overall performance metrics across all students
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Average Improvement
                    </span>
                    <span className="font-medium text-green-600">+23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Session Completion
                    </span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Student Satisfaction
                    </span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Learning Patterns</span>
                  </CardTitle>
                  <CardDescription>
                    AI-identified patterns in student learning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Most Effective Teaching Methods:
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Visual Demonstrations</span>
                        <span className="text-green-600">85% success</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Practice Problems</span>
                        <span className="text-green-600">78% success</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Conceptual Explanations</span>
                        <span className="text-green-600">72% success</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Student Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Student Insights</span>
                  </CardTitle>
                  <CardDescription>
                    Individual student progress and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">Alex Chen</p>
                      <p className="text-xs text-muted-foreground">
                        Struggles with integration concepts
                      </p>
                      <p className="text-xs text-blue-600">
                        Recommend: Visual integration tools
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">Jamie Smith</p>
                      <p className="text-xs text-muted-foreground">
                        Excels in problem-solving
                      </p>
                      <p className="text-xs text-green-600">
                        Recommend: Advanced challenges
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="generator" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>AI Content Generator</span>
                  </CardTitle>
                  <CardDescription>
                    Generate personalized teaching materials for your students
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Subject
                    </label>
                    <Input placeholder="e.g., Advanced Calculus" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Topic
                    </label>
                    <Input placeholder="e.g., Integration by parts" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Content Type
                    </label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>Lesson Plan</option>
                      <option>Worksheet</option>
                      <option>Quiz</option>
                      <option>Practice Problems</option>
                      <option>Study Guide</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Student Level
                    </label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Specific Requirements
                    </label>
                    <Textarea
                      placeholder="Describe any specific requirements or focus areas..."
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Content
                  </Button>
                </CardFooter>
              </Card>

              {/* Quick AI Tools */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick AI Tools</CardTitle>
                  <CardDescription>
                    Instant AI-powered teaching assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="mr-2 h-4 w-4" />
                    Create Custom Lesson Plan
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Generate Practice Questions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Analyze Student Progress
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="mr-2 h-4 w-4" />
                    Find Teaching Videos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Set Learning Objectives
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Get Teaching Tips
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
