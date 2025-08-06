import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  ChevronRight,
  BookOpen,
  Calendar,
  MessageSquare,
  Star,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-16 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Learn with the perfect tutor,{" "}
                <span className="text-primary">powered by AI</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with qualified tutors for personalized learning
                experiences. Our AI-powered platform matches you with the right
                tutor based on your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/student/find-tutor">Find a Tutor</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/tutor/register">Become a Tutor</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students learning"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our tutoring platform combines human expertise with AI assistance
              to provide the best learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Expert Tutors"
              description="Connect with qualified tutors who specialize in your subject areas and match your learning style."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Flexible Scheduling"
              description="Book sessions that fit your schedule with our easy-to-use calendar interface."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-primary" />}
              title="AI Learning Assistant"
              description="Get homework help and exam preparation with our integrated AI learning tools."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy with our simple process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create Your Profile"
              description="Sign up and tell us about your learning goals or teaching expertise."
            />
            <StepCard
              number="2"
              title="Find Your Match"
              description="Students can browse tutors by subject, language, and availability."
            />
            <StepCard
              number="3"
              title="Learn & Grow"
              description="Schedule sessions, use AI tools, and track your progress."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from students and tutors who have transformed their learning
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Student"
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
              quote="Finding a tutor who understood my learning style was a game-changer. The AI homework assistant is incredibly helpful too!"
              rating={5}
            />
            <TestimonialCard
              name="Michael Chen"
              role="Tutor"
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
              quote="As a tutor, this platform has connected me with students who truly benefit from my expertise. The scheduling system is seamless."
              rating={5}
            />
            <TestimonialCard
              name="Emma Rodriguez"
              role="Parent"
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=emma"
              quote="My daughter's grades have improved significantly since finding a math tutor on this platform. The AI tools provide extra support between sessions."
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of students and tutors on our platform today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/student/dashboard">I'm a Student</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/tutor/register">I'm a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TutorMatch AI</h3>
              <p className="text-muted-foreground">
                Connecting students with qualified tutors for personalized
                learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Students</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/student/find-tutor"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Find a Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/student/dashboard"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Student Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-assistant"
                    className="text-muted-foreground hover:text-primary"
                  >
                    AI Learning Assistant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Tutors</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/tutor/register"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Become a Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/dashboard"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Tutor Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/resources"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Teaching Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} TutorMatch AI. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const StepCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const TestimonialCard = ({
  name,
  role,
  image,
  quote,
  rating,
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">"{quote}"</p>
        <div className="flex">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <Star key={i + rating} className="h-4 w-4 text-muted" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
