import { getMusicianData } from "@/edge/detail/detail.service";
import { FC } from "react";

interface MusicianDetailPageProps {
  params: {
    id: string;
  };
}

const MusicianDetailPage: FC<MusicianDetailPageProps> = async ({
  params: { id },
}) => {
  const userData = await getMusicianData(id);

  return <div>MusicianDetailPage</div>;
};

export default MusicianDetailPage;
