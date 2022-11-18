import { TopSellers } from '../components/top-sellers';
import { Banner } from '../components/ui/banner/banner';

export default function Home() {
  const block = (
    <div
      style={{ width: 20, height: 150, background: 'lightgrey', margin: 15 }}
    />
  );
  return (
    <div className="pt-32 sm:pt-26  w-9/12  sm:w-full m-auto">
      <Banner />
      <TopSellers />
      {block}
      {block}
      {block}
      {block}
      {block}
      {block}
      {block}
      {block}
      {block}
      {block}
    </div>
  );
}
