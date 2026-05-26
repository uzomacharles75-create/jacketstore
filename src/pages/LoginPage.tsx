import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { isAuthenticated, login } from "@/lib/auth";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function LoginPage() {
  usePageMeta("Admin Login — J.D & CO BW");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate("/admin", { replace: true });
  }, [navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      login(email, password);
      toast.success("Signed in");
      navigate("/admin");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
          <Link to="/" className="display text-2xl text-secondary">J.D &amp; CO BW</Link>
          <p className="mt-1 text-sm text-muted-foreground">Admin & staff access</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="any password works"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Mock auth — any email/password unlocks the admin dashboard.
            <br />
            Wire your real backend in <code className="text-secondary">src/lib/auth.ts</code>.
          </p>
        </form>
      </Card>
    </div>
  );
}
