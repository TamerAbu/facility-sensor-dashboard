import { PileDetailScreen } from '@/screens/pile-detail-screen';

interface PileDetailPageProps {
  params: Promise<{ pileId: string }>;
}

export default async function PileDetailPage({ params }: PileDetailPageProps) {
  const { pileId } = await params;
  return <PileDetailScreen pileId={pileId} />;
}
