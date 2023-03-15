import { useGetRelatedVideoQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ title, id }) {
  const {
    data: relatedVideo,
    isLoading,
    isError,
  } = useGetRelatedVideoQuery({ id, title });

  //   conditionally render
  let contain = null;
  if (isLoading) {
    contain = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    contain = <Error />;
  }
  if (!isLoading && !isError && relatedVideo.length === 0) {
    contain = <Error message="There was no Related Video Found!" />;
  }
  if (!isLoading && !isError && relatedVideo.length > 0) {
    contain = relatedVideo.map((video) => (
      <RelatedVideo video={video} key={video.id} />
    ));
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {contain}
    </div>
  );
}
