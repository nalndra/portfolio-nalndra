import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export default function Section({ id, children, className = "" }: Props) {
  return (
    <section id={id} className={`site-section ${className}`}>
      <div className="section-inner">{children}</div>
    </section>
  );
}
