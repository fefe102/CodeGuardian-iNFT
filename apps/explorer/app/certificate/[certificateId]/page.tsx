import { notFound } from "next/navigation";
import { CopyButton } from "../../../components/copy-button";
import {
  ChainTransactions,
  CertificateView,
  EvidenceObjects,
  RawJsonDetails,
} from "../../../components/proof-ui";
import {
  chainscanContractUrl,
  getCertificate,
  getChainTransactions,
  getProofObjects,
  storageScanSearchUrl,
} from "../../../lib/proof";

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
        <CertificateView certificate={certificate} />
        <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-4">
          <div>
            <div className="text-sm uppercase text-slate-500">
              Certificate export
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Printable HTML certificate with raw JSON available below.
            </p>
          </div>
          <span className="rounded-md border border-white/15 px-4 py-2 text-sm">
            Use browser print
          </span>
        </div>
        <section className="no-print mt-8 grid gap-5 md:grid-cols-2">
          <div className="border-t border-white/10 pt-5">
            <div className="text-sm uppercase text-slate-500">Minted iNFT</div>
            <div className="mt-2 break-all text-sm text-slate-200">
              {certificate.evidence.inft.contract} #
              {certificate.evidence.inft.tokenId}
            </div>
            <a
              className="mt-3 inline-block rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white"
              href={chainscanContractUrl()}
            >
              Open on 0G ChainScan
            </a>
          </div>
          <div className="border-t border-white/10 pt-5">
            <div className="text-sm uppercase text-slate-500">
              Certified roots
            </div>
            <div className="mt-2 flex flex-wrap items-start gap-2">
              <code className="block min-w-0 flex-1 break-all text-xs text-emerald-200">
                memory {certificate.evidence.memoryRoot}
              </code>
              <CopyButton value={certificate.evidence.memoryRoot} label="Copy memory" />
            </div>
            <div className="mt-2 flex flex-wrap items-start gap-2">
              <code className="block min-w-0 flex-1 break-all text-xs text-slate-400">
                run {certificate.evidence.latestRunRoot}
              </code>
              <CopyButton value={certificate.evidence.latestRunRoot} label="Copy run" />
            </div>
          </div>
        </section>
        <div className="no-print mt-8">
          <EvidenceObjects
            objects={getProofObjects()}
            storageScanUrl={storageScanSearchUrl()}
          />
        </div>
        <div className="no-print mt-8">
          <ChainTransactions transactions={getChainTransactions()} />
        </div>
        <RawJsonDetails
          title="Raw certificate JSON"
          summary="Full certificate export"
          value={certificate}
          className="no-print mt-6"
        />
      </div>
    </main>
  );
}
