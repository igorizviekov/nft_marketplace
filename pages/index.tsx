import { Banner } from '../components/ui/banner/banner';

export default function Home() {
  const block = (
    <div
      style={{ width: 20, height: 150, background: 'lightgrey', margin: 15 }}
    />
  );
  return (
    <div className="pt-32 sm:pt-26 sm:px-5 w-6/12 sm:w-full m-auto">
      <Banner />
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
