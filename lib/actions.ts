"use server";

// This is a server action code section of NextJs it is in this file we actually write code that
// interact with the database and manipualte them other than the components and tha pages files
// Inorder to write the server actions code we need to make the file "use server" only then it can
// interact with the server, ALL the functions written here will run in the server
import { auth } from "@/auth";
import { StartupFormInputs } from "@/components/StartupForm";
import { parseServerActionResponse, RESPONSE_STATUS } from "./utils";
import slugify from "slugify";
import { prisma } from "./prisma";

export const createPitch = async (pitchData: StartupFormInputs) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: RESPONSE_STATUS.ERROR,
    });
  }
  const { title, description, category, link, pitch } = pitchData;

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const data = {
      title,
      description,
      category,
      image: link,
      slug,
      views: 0,
      pitch,
      authorId: parseInt(session.id, 10),
    };
    const result = await prisma.startup.create({
      data,
    });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: RESPONSE_STATUS.SUCCESS,
    });
  } catch (error) {
    console.error("Error while creating startup: ", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: RESPONSE_STATUS.ERROR,
    });
  }
};
