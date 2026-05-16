"use client";

import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { 
  ArrowRight, Apple, Loader2, Globe, Command
} from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@livfit/lib";
import { toast } from "../toaster";

export interface LoginFormProps {
  onSuccessRedirect?: string;
  allowSignup?: boolean;
  type?: "patient" | "staff";
}

export function LoginForm({ 
  onSuccessRedirect = "/", 
  allowSignup = true,
  type = "patient"
}: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Logic for demo/supabase
      const result = await login(email, password);
      if (result) {
        toast.success(`Welcome back! Authorized as ${result.user.app_metadata?.role || "User"}`);
        router.push(onSuccessRedirect);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {type === "staff" ? "Work Email" : "Email Address"}
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={type === "staff" ? "staff@livfit.app" : "john@example.com"} 
            required 
            className="rounded-xl border-slate-200 bg-white h-12 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {type === "staff" ? "Security Key" : "Password"}
            </Label>
            <button 
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            required 
            className="rounded-xl border-slate-200 bg-white h-12 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm font-bold text-red-500 animate-pulse">{error}</p>
        )}

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all hover:scale-[1.01] active:scale-[0.99]"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{type === "staff" ? "Authorized Access" : "Sign In"}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </Button>
      </form>

      {type === "patient" && (
        <>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-4 text-slate-400 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 h-12">
              <Globe className="h-5 w-5 text-slate-600" />
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 h-12">
              <Apple className="h-5 w-5 text-slate-600" />
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 h-12">
              <Command className="h-5 w-5 text-slate-600" />
            </Button>
          </div>

          {allowSignup && (
            <p className="text-center mt-10 text-sm font-medium text-slate-500">
              New to LivFit?{" "}
              <button 
                onClick={() => router.push("/signup")}
                className="text-blue-600 font-bold hover:underline"
              >
                Create an account
              </button>
            </p>
          )}
        </>
      )}
    </div>
  );
}
