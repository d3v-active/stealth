import type { MailboxPolicy } from "./domain";
import type { ApiRepository } from "./repository";
import { defaultMailboxPolicy } from "./repository";

export async function getMailboxPolicy(repository: ApiRepository, owner: string) {
  const stored = await repository.getPolicy(owner);
  return {
    owner,
    policy: stored ?? defaultMailboxPolicy,
    source: stored ? ("configured" as const) : ("default" as const),
  };
}

export async function setMailboxPolicy(
  repository: ApiRepository,
  owner: string,
  policy: MailboxPolicy,
) {
  return {
    owner,
    policy: await repository.setPolicy(owner, policy),
    source: "configured" as const,
  };
}
