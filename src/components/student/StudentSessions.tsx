import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Clock,
  Video,
  MessageSquare,
  FileText,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Session {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  rating?: number;
  notes?: string;
}

interface StudentSessionsProps {
  upcomingSessions?: Session[];
  completedSessions?: Session[];
}

export default function StudentSessions({
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
      rating: 5,
      notes: "Great session on quantum mechanics!",
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
      rating: 4,
      notes: "Excellent analysis of Shakespeare's works.",
    },
    {
      id: "6",
      tutorName: "Dr. Robert Kim",
      tutorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      subject: "Statistics",
      date: "April 28, 2023",
      time: "1:00 PM",
      duration: "90 min",
      status: "completed",
      rating: 5,
      notes: "Very helpful with probability distributions.",
    },
  ],
}: StudentSessionsProps) {
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
              <h1 className="text-3xl font-bold">My Sessions</h1>
              <p className="text-muted-foreground">
                Manage your tutoring sessions and view session history
              </p>
            </div>
          </div>
          <Button>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Schedule New Session
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
                              <AvatarImage src={session.tutorAvatar} />
                              <AvatarFallback>
                                {session.tutorName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {session.subject}
                              </h3>
                              <p className="text-muted-foreground">
                                with {session.tutorName}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-sm">
                            {session.status}
                          </Badge>
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
                              Join Session
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
                              <AvatarImage src={session.tutorAvatar} />
                              <AvatarFallback>
                                {session.tutorName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {session.subject}
                              </h3>
                              <p className="text-muted-foreground">
                                with {session.tutorName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
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
                              <Video className="mr-2 h-4 w-4" />
                              Watch Recording
                            </Button>
                            <Button size="sm" variant="outline">
                              Book Again
                            </Button>
                          </div>
                        </div>

                        {session.notes && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
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
                                  <AvatarImage src={session.tutorAvatar} />
                                  <AvatarFallback>
                                    {session.tutorName.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">
                                    {session.subject}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {session.tutorName}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{session.time}</p>
                                <p className="text-sm text-muted-foreground">
                                  {session.duration}
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
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    This Month
                  </span>
                  <span className="font-medium">8 sessions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Hours
                  </span>
                  <span className="font-medium">12.5 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Avg Rating
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                  </div>
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
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Tutor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" />
                  Recordings Library
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
