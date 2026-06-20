// src/app/portal/[token]/page.js
// Redirect /portal/:token → /customer/:token for backward compatibility.

import { redirect } from "next/navigation";

export default async function PortalRedirect({ params }) {
  const { token } = await params;
  redirect(`/customer/${token}`);
}
