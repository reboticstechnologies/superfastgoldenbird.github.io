
import { Octokit } from "octokit";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GH_OWNER = process.env.GH_OWNER;
const GH_REPO  = process.env.GH_REPO;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Only POST allowed" });

  try {
    const body = req.body;

    const name = (body.name || "").trim();
    const mobile = (body.mobile || "").trim();
    const email = (body.email || "").trim();

    if(!name || !mobile || !email){
      return res.status(400).json({ error: "Missing fields" });
    }

    const record = {
      name, mobile, email,
      ts: new Date().toISOString()
    };

    const filePath = "registrations/data.json";

    let existing = null;
    try {
      const fileRes = await octokit.rest.repos.getContent({
        owner: GH_OWNER,
        repo: GH_REPO,
        path: filePath
      });
      existing = {
        sha: fileRes.data.sha,
        content: Buffer.from(fileRes.data.content, "base64").toString("utf8")
      };
    } catch(err){}

    const newContent = (existing?.content || "") + JSON.stringify(record) + "\n";
    const base64 = Buffer.from(newContent).toString("base64");

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: GH_OWNER,
      repo: GH_REPO,
      path: filePath,
      message: "New registration",
      content: base64,
      sha: existing?.sha
    });

    return res.status(200).json({ ok: true });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
