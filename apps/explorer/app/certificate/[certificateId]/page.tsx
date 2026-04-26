import { notFound } from "next/navigation";
import { CertificateView } from "../../../components/proof-ui";
import { getCertificate } from "../../../lib/proof";

export default async function CertificatePage({ params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params;
  let certificate;
  try {
    certificate = getCertificate(certificateId);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="no-print mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Certificate</h1>
          <span className="rounded-md border border-white/15 px-4 py-2 text-sm">Use browser print</span>
        </div>
        <CertificateView certificate={certificate} />
        <pre className="no-print mt-6 overflow-auto rounded-md bg-black/25 p-4 text-xs text-slate-300">{JSON.stringify(certificate, null, 2)}</pre>
      </div>
    </main>
  );
}
