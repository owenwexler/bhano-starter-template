import type { FC } from 'hono/jsx';
import Header from '../Header';

interface BodyProps {
  children: any; // TODO: figure out how Hono types children
}

const Body: FC<BodyProps> = ({ children }) => {
  return (
    <body>
      { children }
    </body>
  )
}

export default Body;
