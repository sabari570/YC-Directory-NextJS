import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";

// We can add another key to the existing type
// It uses the Startup Type without the Type author key in it and then add the property of author into it which is optional
export type StarupCardType = Omit<Startup, "author"> & { author?: Author };

export default function StartupCard({ post }: { post: StarupCardType }) {
  const { id, title, views, description, category, image, createdAt, author } =
    post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(createdAt.toString())}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?.id}`}>
            <p>{author?.name}</p>
          </Link>
          <Link href={`/startup/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?.id}`}>
          <Image
            src={author?.image ?? ""}
            alt={author?.name ?? ""}
            width={38}
            height={38}
            className="rounded-full w-10 h-10"
          />
        </Link>
      </div>

      <Link href={`/startup/${id}`}>
        <p className="startup-card_desc">{description}</p>

        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={index}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);
