import { PropsWithChildren} from "react";


export default function Layout({ children }: PropsWithChildren) {
  return (
    <div >
      <main>{children}</main>
    </div>
  );
}