
import { FC } from 'hono/jsx';
import { buttonClasses } from '../style/buttonClasses';

const Counter: FC = () => {
  return (
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-xl font-bold text-black">Counter:</h1>
      <div class="flex flex-row items-center justify-center space-x-3" x-data="{ count: 0 }">
        <button class={buttonClasses} x-on:click="count--">-</button>
        <h1 class="text-black text-xl font-bold" x-text="count"></h1>
        <button class={buttonClasses} x-on:click="count++">+</button>
      </div>
    </div>

  );
}

export default Counter;
