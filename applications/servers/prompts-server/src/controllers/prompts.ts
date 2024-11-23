import { db } from "../configs/firerbase.ts";
import { authorizeApiKey } from "../authorization/quthorizations.ts";

export async function getPrompt(req: Request): Promise<Response> {
  await Promise.resolve();

  const url = new URL(req.url);
  const pathSplits = url.pathname.split("/");

  const id = pathSplits[3];
  const apiKey = req.headers.get("authorization")?.split("Bearer ")[1] ??
    null;
  const org = req.headers.get("x-organisation");

  console.log(apiKey);

  if (!org) {
    return new Response("Invalid organisation", { status: 401 });
  }
  if (!apiKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { key, organisation } = await authorizeApiKey(apiKey);
  if (!(key === "valid") || organisation !== org) {
    return new Response("Unauthorized", { status: 401 });
  }

  const orgRef = db.collection("organisations").doc(org);
  const libraryRef = orgRef.collection("standard-library");
  const queryRef = libraryRef.where("name", "==", id);

  const snapshot = await queryRef.get();
  if (snapshot.empty) {
    return new Response("Prompt not found", { status: 404 });
  }
  const units = await snapshot.docs[0].ref.collection("units").get();

  const prompt = {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
    units: units.docs.map((doc) => doc.data()),
  };

  return new Response(JSON.stringify(prompt));
}
