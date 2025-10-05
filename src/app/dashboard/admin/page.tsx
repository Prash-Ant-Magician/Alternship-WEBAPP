'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Users, Shield, Briefcase, Bot, FileText, IndianRupee, Activity } from 'lucide-react';

const adminFeatures = [
    {
        category: "User & Company Management",
        icon: <Users className="h-6 w-6 text-primary" />,
        points: [
            "Approve/reject company registrations (avoid frauds).",
            "Suspend/ban abusive users or fake companies.",
            "Monitor platform activity & analytics dashboards.",
        ],
    },
    {
        category: "Internship Listings",
        icon: <Briefcase className="h-6 w-6 text-primary" />,
        points: [
            "Review internship postings before they go live.",
            "Flag/remove inappropriate or scam offers.",
        ],
    },
    {
        category: "AI Evaluation Control",
        icon: <Bot className="h-6 w-6 text-primary" />,
        points: [
            "Set evaluation rules/weights (skills, CV quality, assessments).",
            "Update AI models or criteria (e.g., adapt to new job trends).",
        ],
    },
    {
        category: "Content & Community",
        icon: <FileText className="h-6 w-6 text-primary" />,
        points: [
            "Post blogs, career guides, AI-generated tips.",
            "Moderate discussions, Q&A forums, or student groups.",
        ],
    },
    {
        category: "Platform Oversight",
        icon: <Activity className="h-6 w-6 text-primary" />,
        points: [
            "Manage payments/subscriptions if monetized.",
            "View overall statistics (active users, success matches, placements).",
        ],
    },
];

export default function AdminDashboardPage() {
  return (
    <>
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Super Control Tower</h1>
            <p className="text-muted-foreground mt-1">Admins keep the ecosystem clean, fair, and running smooth.</p>
        </div>
      
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminFeatures.map((feature) => (
                <Card key={feature.category}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                        <div className="p-3 rounded-md bg-primary/10">
                            {feature.icon}
                        </div>
                        <CardTitle className="text-lg font-semibold">{feature.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            {feature.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="mt-8">
             <h2 className="text-2xl font-bold font-headline mb-4">Platform Analytics</h2>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
                </Card>
                 <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Placements</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">231</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹1,50,000</div>
                    <p className="text-xs text-muted-foreground">+12.2% from last month</p>
                </CardContent>
                </Card>
                 <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">5 companies, 7 internships</p>
                </CardContent>
                </Card>
            </div>
        </div>
    </>
  );
}
