"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input, Label } from "@livfit/ui";
import { 
  Mail, ArrowLeft, CheckCircle2, Loader2, Heart
} from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-12 justify-center">
          <Heart className="h-6 w-6 text-blue-600" />
          <span className="text-2xl font-black tracking-tighter text-slate-900">LIVFIT</span>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200 rounded-3xl overflow-hidden">
          <CardContent className="p-10 text-center">
            {!sent ? (
              <>
                <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Mail className="h-10 w-10" />
                </div>
                
                <h1 className="text-3xl font-black text-slate-900 mb-2">Reset Password</h1>
                <p className="text-slate-500 font-medium mb-8">
                  Enter your email and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Email Address</Label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      className="h-14 rounded-2xl border-slate-200 focus:ring-blue-600 text-lg px-6 bg-slate-50/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg shadow-lg shadow-blue-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending Link...</span>
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-4 animate-in fade-in zoom-in duration-500">
                <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="h-12 w-12" strokeWidth={3} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4">Check Your Inbox</h1>
                <p className="text-lg text-slate-500 font-medium mb-10 max-w-xs mx-auto">
                  We've sent a recovery link to <span className="text-slate-900 font-bold">{email}</span>.
                </p>
                <p className="text-sm text-slate-400 font-medium">
                  Didn't receive the email?{" "}
                  <button onClick={() => setSent(false)} className="text-blue-600 font-bold hover:underline">
                    Try again
                  </button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Link href="/login" className="flex items-center justify-center gap-2 mt-8 text-slate-500 font-bold hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
