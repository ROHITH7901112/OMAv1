"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"

const happinessData = [
    { score: "1 - Very Unhappy", count: 5, color: "#ef4444" },
    { score: "2 - Unhappy", count: 12, color: "#fb923c" },
    { score: "3 - Neutral", count: 25, color: "#fde047" },
    { score: "4 - Happy", count: 45, color: "#86efac" },
    { score: "5 - Very Happy", count: 30, color: "#22c55e" },
]

export function HappinessChart() {
    return (
        <Card className="flex flex-col h-full shadow-md border border-gray-200 bg-white/50 backdrop-blur-sm">
            <CardHeader className="items-center pb-2">
                <CardTitle>Employee Happiness Index</CardTitle>
                <CardDescription>Sentiment distribution across the organization (1-5 Scale)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-2">
                <div className="h-[300px] w-full flex justify-center">
                    <BarChart
                        width={500}
                        height={300}
                        data={happinessData}
                        margin={{
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="score"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#4B5563", fontSize: 13 }}
                        />
                        <YAxis type="number" hide />
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                            {happinessData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </CardContent>
        </Card>
    )
}
