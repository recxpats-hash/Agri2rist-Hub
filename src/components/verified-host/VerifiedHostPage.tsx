import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

export default function VerifiedHostPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = "http://localhost:5001/api/dashboard"; // Flask dashboard API

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        // fallback to empty
        if (mounted) setData(null);
        console.error("VerifiedHost: failed to load dashboard", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <PageLayout>
      <div className="bg-primary py-10">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-extrabold">Agri2rist Hub — Verified Host Program</h1>
          <p className="mt-2 text-lg max-w-2xl">Enterprise-grade host certification, learning and operations center for hosts, trainers and administrators.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="d-flex mb-4 flex-wrap items-center justify-between">
          <div>
            <nav className="text-sm text-muted-foreground">Dashboard / Verified Host</nav>
            <h2 className="text-2xl font-bold mt-2">Program Dashboard</h2>
          </div>
          <div className="flex gap-2">
            <Button className="bg-secondary text-secondary-foreground" asChild>
              <a href="http://localhost:5001/dashboard" target="_blank" rel="noopener">Open Hosted Dashboard</a>
            </Button>
            <Link to="/get-listed"><Button variant="ghost">Start Onboarding</Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <small className="text-muted">Total Students</small>
            <div className="text-2xl font-bold mt-2">{loading ? '—' : data?.total_students ?? 0}</div>
          </div>
          <div className="card p-4">
            <small className="text-muted">Total Trainers</small>
            <div className="text-2xl font-bold mt-2">{loading ? '—' : data?.total_trainers ?? 0}</div>
          </div>
          <div className="card p-4">
            <small className="text-muted">Active Courses</small>
            <div className="text-2xl font-bold mt-2">{loading ? '—' : data?.active_courses ?? 0}</div>
          </div>
          <div className="card p-4">
            <small className="text-muted">Certificates Issued</small>
            <div className="text-2xl font-bold mt-2">{loading ? '—' : data?.certificates ?? 0}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 card p-4">
            <h3 className="font-semibold mb-3">Revenue</h3>
            <div className="text-3xl font-extrabold text-primary">{loading ? '—' : (data?.revenue ?? 0).toLocaleString()}</div>
            <p className="text-sm text-muted mt-2">Total revenue across payments.</p>
          </div>

          <div className="card p-4">
            <h3 className="font-semibold mb-3">Quick Stats</h3>
            <div className="text-sm text-muted">Pending Payments <span className="float-right font-bold">{loading ? '—' : data?.pending_payments ?? 0}</span></div>
            <div className="text-sm text-muted mt-2">Upcoming Classes <span className="float-right font-bold">{loading ? '—' : data?.upcoming_classes ?? 0}</span></div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
