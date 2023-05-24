import { ReactNode } from "react";

interface Props {
  state?: string;
  children: ReactNode;
}

export default function PageWrapper(props: Props) {
  return <>{props.children}</>;
}
