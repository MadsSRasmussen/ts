import { db } from "../configs/firerbase.ts";

export async function authorizeApiKey(
  apiKey: string,
): Promise<{ key: "invalid" | "valid"; organisation: string | null }> {
  const apiKeysRef = db.collection("api-keys");
  const queryRef = apiKeysRef.where("key", "==", apiKey);

  const snapshot = await queryRef.get();

  if (snapshot.empty) {
    return {
      key: "invalid",
      organisation: null,
    };
  } else {
    const key = snapshot.docs[0].data();
    console.log(key);
    return {
      key: "valid",
      organisation: key.organisation ?? null,
    };
  }
}
