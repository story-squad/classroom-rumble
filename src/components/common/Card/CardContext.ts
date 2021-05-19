import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from 'react';

const CardContext = createContext<ICardContext>({
  headerRef: null,
  bodyRef: null,
  setTopRightSize: () => null,
  setMenuOpen: () => null,
});

export interface ICardContext {
  hasTopRight?: boolean;
  menuOpen?: boolean;
  topRightSize?: string;
  headerRef: MutableRefObject<HTMLDivElement | null> | null;
  bodyRef: MutableRefObject<HTMLDivElement | null> | null;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setTopRightSize: Dispatch<SetStateAction<string | undefined>>;
}

export default CardContext;
