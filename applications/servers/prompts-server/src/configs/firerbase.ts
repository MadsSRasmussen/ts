import "@std/dotenv/load";
import { cert, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const certification = {
  type: Deno.env.get("FIREBASE_ADMIN_TYPE"),
  project_id: Deno.env.get("FIREBASE_ADMIN_PROJECT_ID"),
  private_key_id: Deno.env.get("FIREBASE_ADMIN_PRIVATE_KEY_ID"),
  private_key: Deno.env.get("FIREBASE_ADMIN_PRIVATE_KEY"),
  client_email: Deno.env.get("FIREBASE_ADMIN_CLIENT_EMAIL"),
  clilent_id: Deno.env.get("FIREBASE_ADMIN_CLIENT_ID"),
  auth_uri: Deno.env.get("FIREBASE_ADMIN_AUTH_URI"),
  token_uri: Deno.env.get("FIREBASE_ADMIN_TOKEN_URI"),
  auth_provider_x509_cert_url: Deno.env.get("FIREBASE_ADMIN_AUTH_PROVIDER"),
  client_x509_cert_url: Deno.env.get("FIREBASE_ADMIN_CLIENT"),
  universe_domain: Deno.env.get("FIREBASE_ADMIN_UNIVERSE_DOMAIN"),
};
const app = initializeApp({
  credential: cert(certification as ServiceAccount),
});

const db = getFirestore();

export { app, db };
