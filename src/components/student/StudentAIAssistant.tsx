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
  Lightbulb,
  Target,
  Clock,
  TrendingUp,
  Search,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface StudentAIAssistantProps {
  aiResources?: AIResource[];
  aiStrategies?: AIStrategy[];
}

export default function StudentAIAssistant({
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
        "Test yourself regularly without looking at answers",
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
        "Track your completed pomodoros",
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
        "Form study groups for collaborative learning",
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
        "Celebrate small wins along the way",
      ],
    },
  ],
}: StudentAIAssistantProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

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

  const filteredResources = aiResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      resource.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const subjects = [...new Set(aiResources.map((r) => r.subject))];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/student/dashboard")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <span>AI Learning Assistant</span>
              </h1>
              <p className="text-muted-foreground">
                Personalized AI-powered resources and strategies to enhance your
                learning
              </p>
            </div>
          </div>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Custom Content
          </Button>
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resources">AI Study Resources</TabsTrigger>
            <TabsTrigger value="strategies">Learning Strategies</TabsTrigger>
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
                        placeholder="Search resources..."
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
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
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
                      Access Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="strategies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiStrategies.map((strategy) => (
                <Card
                  key={strategy.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      {getCategoryIcon(strategy.category)}
                      <CardTitle className="text-lg">
                        {strategy.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs ml-auto">
                        {strategy.category.replace("_", " ")}
                      </Badge>
                    </div>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Key Tips:</h4>
                      <div className="space-y-2">
                        {strategy.tips.map((tip, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Apply Strategy
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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
                    Generate personalized study materials based on your needs
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
                      <option>Study Guide</option>
                      <option>Practice Questions</option>
                      <option>Flashcards</option>
                      <option>Summary Notes</option>
                      <option>Exam Prep</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Difficulty Level
                    </label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Additional Requirements
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

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick AI Tools</CardTitle>
                  <CardDescription>
                    Instant AI-powered learning assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="mr-2 h-4 w-4" />
                    Explain Complex Concept
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Generate Practice Quiz
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Study Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Set Learning Goals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Get Study Tips
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="mr-2 h-4 w-4" />
                    Find Learning Videos
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
