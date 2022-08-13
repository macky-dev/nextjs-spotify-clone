import FeaturedPlaylistSection from "./FeaturedPlaylistSection";
import RecentlyPlayedSection from "./RecentlyPlayedSection";

const Dashboard = () => {
  return (
    <section
      className={`flex flex-col bg-gradient-to-b from-red-900 via-black to-black h-screen text-white p-8 pt-20 space-y-5`}
    >
      <h1 className="text-xl md:text-2xl font-bold">Recently played</h1>
      <RecentlyPlayedSection />
      <h1 className="text-xl md:text-2xl font-bold">Featured playlists</h1>
      <FeaturedPlaylistSection />
    </section>
  );
};

export default Dashboard;
