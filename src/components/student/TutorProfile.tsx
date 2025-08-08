import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  Globe,
  BookOpen,
  Calendar as CalendarIcon,
  MapPin,
  Award,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface TutorProfileProps {
  tutorId?: string;
}

const TutorProfile: React.FC<TutorProfileProps> = ({
  tutorId: propTutorId,
}) => {
  const { tutorId: paramTutorId } = useParams();
  const navigate = useNavigate();
  const tutorId = propTutorId || paramTutorId;

  // Mock data - in a real app, this would be fetched based on tutorId
  const tutor = {
    id: tutorId || "1",
    name: "Dr. Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 4.9,
    totalReviews: 127,
    subjects: ["Mathematics", "Physics", "Calculus", "Statistics"],
    languages: ["English", "Spanish"],
    hourlyRate: 45,
    availability: "Weekdays, Evenings",
    location: "New York, NY",
    experience: "10+ years",
    education: "PhD in Mathematics from MIT",
    description:
      "PhD in Mathematics with 10+ years of teaching experience. I specialize in advanced calculus, physics, and statistics. My teaching approach focuses on building strong foundational understanding while making complex concepts accessible and engaging. I have helped over 200 students improve their grades and develop confidence in mathematics.",
    achievements: [
      "Published researcher in Applied Mathematics",
      "Former MIT Teaching Assistant",
      "Certified Math Tutor (Level 5)",
      "Winner of Excellence in Teaching Award 2023",
    ],
    weeklyAvailability: {
      Monday: ["Morning", "Evening"],
      Tuesday: ["Morning", "Afternoon"],
      Wednesday: ["Evening"],
      Thursday: ["Morning", "Evening"],
      Friday: ["Afternoon"],
    },
    openSchedule: [
      {
        date: "2024-01-15",
        timeSlots: [
          "9:00 AM - 10:00 AM",
          "2:00 PM - 3:00 PM",
          "7:00 PM - 8:00 PM",
        ],
      },
      {
        date: "2024-01-16",
        timeSlots: ["10:00 AM - 11:00 AM", "3:00 PM - 4:00 PM"],
      },
      {
        date: "2024-01-17",
        timeSlots: ["1:00 PM - 2:00 PM", "6:00 PM - 7:00 PM"],
      },
      {
        date: "2024-01-18",
        timeSlots: ["9:00 AM - 10:00 AM", "11:00 AM - 12:00 PM"],
      },
    ],
    sessionFormats: ["Online", "In-person"],
    sessionDurations: ["60 min", "90 min"],
    reviews: [
      {
        id: 1,
        studentName: "Alex M.",
        rating: 5,
        comment:
          "Dr. Johnson is an excellent tutor! She helped me understand calculus concepts that I was struggling with for months.",
        date: "2024-01-10",
        subject: "Calculus",
      },
      {
        id: 2,
        studentName: "Maria S.",
        rating: 5,
        comment:
          "Very patient and knowledgeable. Her teaching methods are clear and effective.",
        date: "2024-01-08",
        subject: "Physics",
      },
      {
        id: 3,
        studentName: "John D.",
        rating: 4,
        comment:
          "Great tutor with deep knowledge. Sometimes moves a bit fast, but overall very helpful.",
        date: "2024-01-05",
        subject: "Statistics",
      },
    ],
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto p-6">
          <Button variant="ghost" onClick={handleGoBack} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={tutor.avatar} alt={tutor.name} />
                <AvatarFallback className="text-2xl">
                  {tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{tutor.rating}</span>
                <span className="text-muted-foreground">
                  ({tutor.totalReviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {tutor.education}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{tutor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{tutor.experience} experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{tutor.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-2xl">
                    ${tutor.hourlyRate}/hr
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="px-8">
                  Book a Session
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" size="lg">
                  View Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {tutor.description}
                </p>
              </CardContent>
            </Card>

            {/* Subjects & Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Subjects & Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <BookOpen size={14} /> Subjects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <Globe size={14} /> Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tutor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {review.studentName}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {review.subject}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Availability & Booking */}
          <div className="space-y-6">
            {/* Session Details */}
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Format
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.sessionFormats.map((format, index) => (
                      <Badge key={index} variant="outline">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Duration Options
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.sessionDurations.map((duration, index) => (
                      <Badge key={index} variant="outline">
                        {duration}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    ${tutor.hourlyRate}/hr
                  </div>
                  <p className="text-sm text-muted-foreground">Starting rate</p>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={16} /> Weekly Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(tutor.weeklyAvailability).map(
                    ([day, times]) => (
                      <div
                        key={day}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="font-medium">{day}</span>
                        <span className="text-muted-foreground">
                          {times.join(", ")}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Next Available Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon size={16} /> Next Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tutor.openSchedule.slice(0, 3).map((schedule, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="font-medium text-sm mb-1">
                        {new Date(schedule.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {schedule.timeSlots
                          .slice(0, 2)
                          .map((slot, slotIndex) => (
                            <div key={slotIndex}>{slot}</div>
                          ))}
                        {schedule.timeSlots.length > 2 && (
                          <div className="text-primary">
                            +{schedule.timeSlots.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">View Full Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
