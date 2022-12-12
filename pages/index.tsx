import { NftList } from '../components/nft-list';
import { TopSellers } from '../components/top-sellers';
import { Banner } from '../components/ui/banner/banner';

export default function Home() {
  return (
    <div className="pt-32 sm:pt-26  w-9/12  sm:w-full m-auto">
      <Banner />
      <TopSellers />
      <NftList />
    </div>
  );
}
