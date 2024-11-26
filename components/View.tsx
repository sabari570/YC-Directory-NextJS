import React from "react";
import Ping from "./Ping";
import { prisma } from "@/lib/prisma";

// This function helps us to schedule a operation or task that must be executed after some certain tasks
// Like in here update the view count after fetching/viewing the startup post from the database
import { unstable_after as after } from "next/server";

const fetchStartupView = async (id: string) => {
  try {
    const viewCount = await prisma.startup.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      select: {
        views: true,
      },
    });
    return viewCount;
  } catch (error) {
    console.error("Error while fetching the startup: ", error);
    return null;
  }
};

export default async function View({ id }: { id: string }) {
  const viewCount = await fetchStartupView(id);
  const totalViews = viewCount ? viewCount.views : 0;

  //   This gets executed and updates the view count of the startup in database
  //   We can also perform this operation without using the after method, but by this way the updation process occurs in the backgorund
  //   without blocking the UI
  after(
    async () =>
      await prisma.startup.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          views: {
            increment: 1,
          },
        },
      })
  );
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">{totalViews} views</span>
      </p>
    </div>
  );
}
