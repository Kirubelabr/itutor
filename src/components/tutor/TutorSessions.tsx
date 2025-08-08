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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Session {
  id: string;
  studentName: string;
  studentAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  rating?: number;
  notes?: string;
  earnings?: number;
}

interface TutorSessionsProps {
  upcomingSessions?: Session[];
  completedSessions?: Session[];
}

export default function TutorSessions({
  upcomingSessions = [
    {
      id: "1",
      studentName: "Alex Chen",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      subject: "Advanced Calculus",
      date: "Today",
      time: "3:00 PM - 4:00 PM",
      duration: "60 min",
      status: "upcoming",
      earnings: 75,
    },
    {
      id: "2",
      studentName: "Jamie Smith",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      subject: "Physics",
      date: "Tomorrow",
      time: "1:00 PM - 2:30 PM",
      duration: "90 min",
      status: "upcoming",
      earnings: 112.5,
    },
    {
      id: "3",
      studentName: "Taylor Wong",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      subject: "Chemistry",
      date: "May 15, 2023",
      time: "10:00 AM - 11:00 AM",
      duration: "60 min",
      status: "upcoming",
      earnings: 80,
    },
  ],
  completedSessions = [
    {
      id: "4",
      studentName: "Morgan Lee",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
      subject: "Biology",
      date: "May 5, 2023",
      time: "2:00 PM - 3:00 PM",
      duration: "60 min",
      status: "completed",
      rating: 5,
      notes: "Great progress on cellular respiration!",
      earnings: 70,
    },
    {
      id: "5",
      studentName: "Sam Johnson",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      subject: "Mathematics",
      date: "May 3, 2023",
      time: "4:00 PM - 5:30 PM",
      duration: "90 min",
      status: "completed",
      rating: 4,
      notes: "Excellent work on quadratic equations.",
      earnings: 105,
    },
    {
      id: "6",
      studentName: "Riley Davis",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
      subject: "Chemistry",
      date: "April 28, 2023",
      time: "11:00 AM - 12:00 PM",
      duration: "60 min",
      status: "completed",
      rating: 5,
      notes: "Student mastered stoichiometry concepts.",
      earnings: 80,
    },
  ],
}: TutorSessionsProps) {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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

  const totalEarnings = completedSessions.reduce(
    (sum, session) => sum + (session.earnings || 0),
    0,
  );
  const averageRating =
    completedSessions.reduce((sum, session) => sum + (session.rating || 0), 0) /
    completedSessions.length;

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
              <h1 className="text-3xl font-bold">My Sessions</h1>
              <p className="text-muted-foreground">
                Manage your tutoring sessions and track your teaching progress
              </p>
            </div>
          </div>
          <Button>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Set Availability
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Sessions Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="completed">Session History</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <Card
                      key={session.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={session.studentAvatar} />
                              <AvatarFallback>
                                {session.studentName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {session.subject}
                              </h3>
                              <p className="text-muted-foreground">
                                with {session.studentName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-sm">
                              ${session.earnings}
                            </Badge>
                            <Badge variant="outline" className="text-sm">
                              {session.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>Duration: {session.duration}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm">
                              <Video className="mr-2 h-4 w-4" />
                              Start Session
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="space-y-4">
                  {completedSessions.map((session) => (
                    <Card
                      key={session.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={session.studentAvatar} />
                              <AvatarFallback>
                                {session.studentName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {session.subject}
                              </h3>
                              <p className="text-muted-foreground">
                                with {session.studentName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                              ${session.earnings}
                            </Badge>
                            {session.rating && (
                              <div className="flex items-center space-x-1">
                                {renderStars(session.rating)}
                              </div>
                            )}
                            <Badge variant="secondary">{session.status}</Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>Duration: {session.duration}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Contact Student
                            </Button>
                          </div>
                        </div>

                        {session.notes && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-1">
                              Session Notes:
                            </p>
                            <p className="text-sm">{session.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Calendar</CardTitle>
                    <CardDescription>
                      View your sessions in calendar format
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="font-medium mb-4">
                        Sessions on{" "}
                        {date?.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </h3>
                      <div className="space-y-2">
                        {upcomingSessions
                          .filter((session) => session.date === "Today")
                          .map((session) => (
                            <div
                              key={session.id}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={session.studentAvatar} />
                                  <AvatarFallback>
                                    {session.studentName.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">
                                    {session.subject}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {session.studentName}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{session.time}</p>
                                <p className="text-sm text-muted-foreground">
                                  ${session.earnings}
                                </p>
                              </div>
                            </div>
                          ))}
                        {upcomingSessions.filter(
                          (session) => session.date === "Today",
                        ).length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No sessions scheduled for this day
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Earnings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    This Month
                  </span>
                  <span className="font-medium">${totalEarnings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Sessions
                  </span>
                  <span className="font-medium">
                    {completedSessions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Avg Rating
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Students
                  </span>
                  <span className="font-medium">
                    {new Set(completedSessions.map((s) => s.studentName)).size}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Completion Rate
                  </span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Response Time
                  </span>
                  <span className="font-medium">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Rebooking Rate
                  </span>
                  <span className="font-medium">85%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Update Availability
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View All Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Session Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Earnings Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
