import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  //   manage all error & loading
  let contain = null;
  if (isLoading) {
    contain = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    contain = <Error message="There was an error occured!" />;
  }
  if (!isLoading && !isError && videos.length === 0) {
    contain = <Error message="No video Found!" />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    contain = videos.map((video) => <Video video={video} key={video.id} />);
  }
  return contain;
}
