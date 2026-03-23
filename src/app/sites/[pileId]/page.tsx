interface PileDetailPageProps {
  params: Promise<{ pileId: string }>;
}

export default async function PileDetailPage({ params }: PileDetailPageProps) {
  const { pileId } = await params;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Pile Detail</h2>
      <p className="mt-2 text-zinc-500">Viewing pile: {pileId}</p>
    </div>
  );
}
