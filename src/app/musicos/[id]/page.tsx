import MusicianBasicInfoForm from "@/components/musician/BasicInfoForm";
import { getMusicianData } from "@/edge/musician/detail.service";
import { FC } from "react";

interface MusicianDetailPageProps {
  params: {
    id: string;
  };
}

const MusicianDetailPage: FC<MusicianDetailPageProps> = async ({
  params,
}) => {
  const { id } = await params
  const getUserData = async () => {
    try {
      const userData = await getMusicianData(id);
      return userData;
    } catch {
      return null;
    }
  };

  const userData = await getUserData();
  return <main>

    <h1>¡Bienvenido!</h1>
    {
      userData ? (
        <>
          <h2>{userData?.nombre}</h2>
        </>
      ) : (
        <MusicianBasicInfoForm id={id} />
      )
    }
  </main>;
};

export default MusicianDetailPage;
