import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function ContactUs() {
    return (
        <div className="bg-white py-20 px-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="max-w-5xl mx-auto flex gap-12 items-start">
                {/* Left: Logo Only */}
                <div className="flex-shrink-0">
                    <img
                        src="/HARTS LOGO.png"
                        alt="HARTS Logo"
                        className="h-16 w-auto object-contain"
                    />
                </div>

                {/* Right: Header + Form */}
                <div className="flex-1 space-y-8">
                    {/* Header Text */}
                    <div className="space-y-2">
                        <p className="text-[#4a4a4a] text-xl font-light tracking-wide">Change starts with a conversation.</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight" style={{ color: '#009b7b' }}>
                            SPEAK TO AN EXPERT
                        </h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2 group">
                            <Label htmlFor="firstName" className="text-[#8c9e99] text-base font-medium">*First Name</Label>
                            <Input id="firstName" className="bg-transparent border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 focus-visible:ring-0 transition-colors" style={{ borderBottomColor: '#b8c5c2', outlineColor: '#009b7b' }} required />
                        </div>
                        <div className="space-y-2 group">
                            <Label htmlFor="lastName" className="text-[#8c9e99] text-base font-medium">*Last Name</Label>
                            <Input id="lastName" className="bg-transparent border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 focus-visible:ring-0 transition-colors" style={{ borderBottomColor: '#b8c5c2', outlineColor: '#009b7b' }} required />
                        </div>
                        <div className="space-y-2 group">
                            <Label htmlFor="company" className="text-[#8c9e99] text-base font-medium">*Company</Label>
                            <Input id="company" className="bg-transparent border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 focus-visible:ring-0 transition-colors" style={{ borderBottomColor: '#b8c5c2', outlineColor: '#009b7b' }} required />
                        </div>
                        <div className="space-y-2 group">
                            <Label htmlFor="jobTitle" className="text-[#8c9e99] text-base font-medium">*Job Title</Label>
                            <Input id="jobTitle" className="bg-transparent border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 focus-visible:ring-0 transition-colors" style={{ borderBottomColor: '#b8c5c2', outlineColor: '#009b7b' }} required />
                        </div>
                        <div className="space-y-2 group">
                            <Label htmlFor="email" className="text-[#8c9e99] text-base font-medium">*Email Address</Label>
                            <Input id="email" type="email" className="bg-transparent border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 focus-visible:ring-0 transition-colors" style={{ borderBottomColor: '#b8c5c2', outlineColor: '#009b7b' }} required />
                        </div>
                        <div className="space-y-2 group">
                            <Label htmlFor="phone" className="text-[#8c9e99] text-base font-medium">*Phone Number</Label>
                            <Input id="phone" type="tel" className="bg-transparent border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 focus-visible:ring-0 transition-colors" style={{ borderBottomColor: '#b8c5c2', outlineColor: '#009b7b' }} required />
                        </div>

                        <div className="space-y-2 group">
                            <Label htmlFor="country" className="text-[#8c9e99] text-base font-medium">*Country</Label>
                            <Select>
                                <SelectTrigger className="bg-transparent border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 focus:ring-0 shadow-none text-left font-normal text-gray-700" style={{ borderBottomColor: '#b8c5c2' }}>
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                    <SelectItem value="in">India</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 group">
                            <Label htmlFor="needs" className="text-[#8c9e99] text-base font-medium">*Tell us more about your needs</Label>
                            <Textarea
                                id="needs"
                                className="bg-transparent min-h-[100px] border-t-0 border-x-0 border-b-2 rounded-none px-0 py-2 resize-none focus-visible:ring-0 transition-colors"
                                style={{ borderBottomColor: '#b8c5c2', outlineColor: '#009b7b' }}
                                required
                            />
                        </div>

                        <div className="flex items-start space-x-3 pt-4">
                            <Checkbox id="terms" className="mt-1 border-[#b8c5c2] data-[state=checked]:bg-[#005a4b] data-[state=checked]:border-[#005a4b]" />
                            <Label htmlFor="terms" className="text-xs font-medium text-[#8c9e99] leading-relaxed">
                                Yes, I would like to receive regular updates on thought leadership, industry insights and upcoming events from HARTS. I understand that I may withdraw my consent at any time. Please review HARTS Privacy Policy and Cookie Policy.
                            </Label>
                        </div>

                        <Button type="submit" className="text-white px-12 py-7 text-lg font-bold rounded-sm mt-8 transition-colors uppercase tracking-wider" style={{ backgroundColor: '#005a4b' }}>
                            Contact us
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
