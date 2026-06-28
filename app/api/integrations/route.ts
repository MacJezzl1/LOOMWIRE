import {
  buildIntegrationKit,
  credentialSummary,
  integrationApps
} from "@/lib/integrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IntegrationsRequest = {
  action?: "prepare" | "validate";
  appId?: string;
  credentials?: Record<string, string | undefined>;
};

export async function GET() {
  return Response.json({
    apps: integrationApps.map((app) => ({
      id: app.id,
      name: app.name,
      category: app.category,
      status: app.status,
      tagline: app.tagline,
      bestFor: app.bestFor,
      outputs: app.outputs,
      fields: app.fields.map((field) => ({
        id: field.id,
        label: field.label,
        required: field.required,
        secret: Boolean(field.secret)
      })),
      docsUrl: app.docsUrl,
      route: app.route
    }))
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IntegrationsRequest;
    const action = body.action || "prepare";

    if (!body.appId) {
      return Response.json(
        { ok: false, message: "Missing integration app ID." },
        { status: 400 }
      );
    }

    const credentials = body.credentials || {};

    if (action === "validate") {
      return Response.json({
        ok: true,
        appId: body.appId,
        credentialStatus: credentialSummary(body.appId, credentials)
      });
    }

    const kit = buildIntegrationKit(body.appId);

    return Response.json({
      ok: true,
      kit,
      credentialStatus: credentialSummary(body.appId, credentials)
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "Unknown integration error."
      },
      { status: 400 }
    );
  }
}
