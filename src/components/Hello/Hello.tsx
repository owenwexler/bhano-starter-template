import { FC } from 'hono/jsx';

interface HelloProps {
  name: string;
}

const Hello: FC<HelloProps> = ({ name }) => {
  return (
    <h1 class="text-black text-xl font-bold">
      Hello{name !== '' ? ` ${name}!` : '!'}
    </h1>
  )
}

export default Hello;
