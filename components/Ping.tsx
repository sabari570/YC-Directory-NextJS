import React from "react";

export default function Ping() {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
          <span className="relative size-[11px] bg-primary rounded-full"></span>
        </span>
      </div>
    </div>
  );
}
