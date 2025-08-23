import type { FC } from 'hono/jsx';

const Loading: FC = () => {
  return (
    <div id="loading-container" class="flex flex-col items-center justify-center bg-white text-black">
      <h1 class="text-black font-bold animate-pulse text-4xl">LOADING...</h1>
    </div>
  );
}

export default Loading;
